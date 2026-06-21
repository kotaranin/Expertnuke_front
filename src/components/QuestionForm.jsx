import { useState } from "react";

function QuestionForm({ question, onAnswer, onNext }) {
    const [numberValue, setNumberValue] = useState("");

    if (!question) return null;

    return (
        <div className="min-h-screen bg-reactor-bg flex items-center justify-center p-8">
            <div className="max-w-2xl w-full bg-reactor-panel border-2 border-reactor-border p-8 font-mono-terminal">
                <p className="text-reactor-green text-xl mb-6 leading-relaxed">
                    {">"} {question.text}
                </p>

                {question.type === "number" && (
                    <div className="flex flex-col gap-4">
                        <input
                            type="number"
                            value={numberValue}
                            onChange={(e) => setNumberValue(e.target.value)}
                            min={question.min}
                            max={question.max}
                            step="any"
                            className="bg-reactor-bg border-2 border-reactor-border text-reactor-green px-4 py-2 text-lg focus:outline-none focus:border-reactor-green"
                            autoFocus
                        />
                        <button
                            onClick={() => {
                                onAnswer(question.field, Number(numberValue));
                                setNumberValue("");
                            }}
                            className="bg-reactor-rust text-reactor-bg font-bold px-6 py-3 border-2 border-reactor-amber hover:bg-reactor-amber transition-colors"
                        >
                            POTVRDI
                        </button>
                    </div>
                )}

                {question.type === "select" && (
                    <div className="flex flex-col gap-3">
                        {question.options.map((option) => (
                            <button
                                key={String(option.value)}
                                onClick={() => onAnswer(question.field, option.value)}
                                className="text-left bg-reactor-panel-light border-2 border-reactor-border text-reactor-text px-4 py-3 hover:border-reactor-green hover:text-reactor-green transition-colors"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}

                {question.type === "multiselect" && (
                    <div className="flex flex-col gap-3">
                        {question.options.map((option) => (
                            <label
                                key={option.field}
                                className="flex items-center gap-3 bg-reactor-panel-light border-2 border-reactor-border px-4 py-3 cursor-pointer hover:border-reactor-amber"
                            >
                                <input
                                    type="checkbox"
                                    onChange={(e) => onAnswer(option.field, e.target.checked)}
                                    className="w-5 h-5 accent-reactor-amber"
                                />
                                <span className="text-reactor-text">{option.label}</span>
                            </label>
                        ))}
                        <button
                            onClick={onNext}
                            className="bg-reactor-rust text-reactor-bg font-bold px-6 py-3 border-2 border-reactor-amber hover:bg-reactor-amber transition-colors mt-2"
                        >
                            POTVRDI
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionForm;