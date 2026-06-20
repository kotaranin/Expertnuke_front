function Header() {
    return (
        <header className="bg-reactor-panel border-b-4 border-reactor-amber px-8 py-5 font-mono-terminal">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
                <div>
                    <h1 className="text-reactor-green text-2xl font-bold tracking-widest">
                        ⚛ EXPERTNUKE
                    </h1>
                    <p className="text-reactor-text-dim text-xs mt-1 tracking-wide">
                        EKSPERTNI SISTEM ZA PREVENCIJU HAVARIJE NA NUKLEARNOM REAKTORU
                    </p>
                </div>
                <div className="text-reactor-amber text-xs border-2 border-reactor-amber px-3 py-1">
                    ● STATUS: AKTIVAN
                </div>
            </div>
        </header>
    );
}

export default Header;