import RecommendationCard from "./RecommendationCard";

function ResultsPanel({ recommendations }) {
    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="min-h-screen bg-reactor-bg flex items-center justify-center p-8 font-mono-terminal">
                <p className="text-reactor-green text-xl">
                    {">"} SVI PARAMETRI U NORMALNOM OPSEGU. NEMA PREPORUKA.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-reactor-bg p-8 font-mono-terminal">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-reactor-red-bright text-2xl font-bold mb-2 tracking-wide">
                    ⚠ PREPORUKE EKSPERTNOG SISTEMA
                </h2>
                <p className="text-reactor-text-dim mb-8 text-sm">
                    Detektovano {recommendations.length} {recommendations.length === 1 ? "preporuka" : "preporuka(e)"} na osnovu unetih parametara
                </p>

                <div className="flex flex-col gap-4">
                    {recommendations.map((rec) => (
                        <RecommendationCard
                            key={rec.code}
                            code={rec.code}
                            name={rec.name}
                            description={rec.description}
                            explanation={rec.explanation} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ResultsPanel;