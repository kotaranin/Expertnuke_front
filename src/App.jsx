import { useState } from "react";
import { questions } from "./data/question";
import Header from "./components/Header";
import QuestionForm from "./components/QuestionForm";
import ResultsPanel from "./components/ResultsPanel";

function App() {
    const [answers, setAnswers] = useState({});
    const [currentQuestionId, setCurrentQuestionId] = useState("P1");
    const [view, setView] = useState("FORM");
    const [recommendations, setRecommendations] = useState([]);

    const currentQuestion = questions.find((q) => q.id === currentQuestionId);

    const updateAnswer = (field, value) => {
        if (field === null) return;
        setAnswers((prev) => ({ ...prev, [field]: value }));
    };

    const goToNext = async (value, latestAnswers) => {
        const nextId = currentQuestion.next(value, latestAnswers);

        if (nextId === null) {
            setView("LOADING");
            try {
                const response = await fetch("http://localhost:8081/api/analysis", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(latestAnswers),
                });
                const data = await response.json();
                setRecommendations(data);
                setView("RESULTS");
            } catch (error) {
                console.error("Greška pri pozivu API-ja:", error);
                setView("FORM");
            }
        } else {
            setCurrentQuestionId(nextId);
        }
    };

    const handleAnswer = (field, value) => {
        const updatedAnswers = field === null ? answers : { ...answers, [field]: value };
        setAnswers(updatedAnswers);

        if (currentQuestion.type === "multiselect") {
            return;
        }

        goToNext(value, updatedAnswers);
    };

    const handleNext = () => {
        goToNext(null, answers);
    };

    return (
        <>
            <Header />
            {view === "FORM" && (
                <QuestionForm
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    onNext={handleNext}
                />
            )}
            {view === "LOADING" && (
                <div className="min-h-screen bg-reactor-bg flex items-center justify-center font-mono-terminal">
                    <p className="text-reactor-green text-xl animate-pulse">
                        {">"} ANALIZIRAM PARAMETRE REAKTORA...
                    </p>
                </div>
            )}
            {view === "RESULTS" && <ResultsPanel recommendations={recommendations} />}
        </>
    );
}

export default App;