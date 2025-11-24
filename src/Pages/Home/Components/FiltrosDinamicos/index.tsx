export default function FiltrosDinamicos({ colunas, filtros, setFiltros }) {
    const handleChange = (campo, valor) => {
        setFiltros(prev => ({ ...prev, [campo]: valor }));
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {colunas.map((c, index) => {
                const nome = c.coluna;
                const tipo = c.tipo?.toUpperCase() || "";

                if (tipo.includes("STRING")) {
                    return (
                        <div key={nome}>
                            <label>{nome}</label>
                            <input
                                type="text"
                                value={filtros[nome] || ""}
                                onChange={(e) => handleChange(nome, e.target.value)}
                                className="input"
                                style={{ width: "100%", padding: "5px" }}
                            />
                        </div>
                    );
                }

                if (tipo.includes("NUMBER")) {
                    return (
                        <div key={nome}>
                            <label>{nome}</label>
                            <input
                                type="number"
                                value={filtros[nome] || ""}
                                onChange={(e) => handleChange(nome, e.target.value)}
                                className="input"
                                style={{ width: "100%", padding: "5px" }}
                            />
                        </div>
                    );
                }

                if (tipo.includes("DATE")) {
                    return (
                        <>
                            <div key={nome}>
                                <label>{nome}_inicio</label>

                                <input
                                    type="date"
                                    value={filtros[`${nome}_inicio`] || ""}
                                    onChange={(e) => handleChange(`${nome}_inicio`, e.target.value)}
                                    className="input"
                                    style={{ width: "100%", padding: "5px", marginBottom: "5px" }}
                                />
                            </div>
                            <div key={index}>
                                <label>{nome}_fim</label>
                                <input 
                                    type="date"
                                    value={filtros[`${nome}_fim`] || ""}
                                    onChange={(e) => handleChange(`${nome}_fim`, e.target.value)}
                                    className="input"
                                    style={{ width: "100%", padding: "5px" }}
                                />
                            </div>
                        </>
                    );
                }

                return null;
            })}
        </div>
    );
}
