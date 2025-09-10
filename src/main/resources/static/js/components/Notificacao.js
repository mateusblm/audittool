function Notificacao({ mensagem, tipo, aoFechar }) {
    if (!mensagem) {
        return null;
    }

    const estilo = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1055, 
        minWidth: '300px'
    };

    return (
        <div style={estilo}>
            <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
                {mensagem}
                <button type="button" className="btn-close" onClick={aoFechar}></button>
            </div>
        </div>
    );
}