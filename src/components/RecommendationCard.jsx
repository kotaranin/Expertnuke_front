function RecommendationCard({ code, explanation, name, description }) {
    return (
        <div className="bg-reactor-panel border-l-4 border-reactor-amber border-t-2 border-r-2 border-b-2 border-t-reactor-border border-r-reactor-border border-b-reactor-border p-5">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-reactor-amber text-reactor-bg font-bold px-3 py-1 text-sm">
                    {code}
                </span>
                <span className="text-reactor-green font-bold">
                    {name}
                </span>
            </div>
            <p className="text-reactor-text-dim text-sm mb-2">{description}</p>
            <p className="text-reactor-text leading-relaxed">{explanation}</p>
        </div>
    );
}

export default RecommendationCard;