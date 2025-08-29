function Aderencia({ dados }) {
    const percentual = dados.percentualAderencia ? dados.percentualAderencia.toFixed(2) : 0;
    return (
        <div className="card mb-4 shadow-sm aderencia-card">
            <div className="card-header">Dashboard de Aderência</div>
            <div className="card-body">
                <div className="row text-center">
                    <div className="col">
                        <h5>{dados.totalItens || 0}</h5>
                        <p className="text-muted">Total de Itens</p>
                    </div>
                    <div className="col">
                        <h5>{dados.itensConformes || 0}</h5>
                        <p className="text-muted">Conformes (Sim)</p>
                    </div>
                    <div className="col">
                        <h5>{dados.itensNaoSeAplica || 0}</h5>
                        <p className="text-muted">Não se Aplica</p>
                    </div>
                    <div className="col">
                        <h4 className="texto-aderencia">{percentual}%</h4>
                        <p className="text-muted"><b>Aderência</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}