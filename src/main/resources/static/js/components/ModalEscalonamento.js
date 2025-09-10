function ModalEscalonamento({ item, onConfirmar, onClose }) {
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        const modalEl = document.getElementById('modalEscalonar');
        const handleHide = () => setEmail('');
        modalEl.addEventListener('hidden.bs.modal', handleHide);
        return () => modalEl.removeEventListener('hidden.bs.modal', handleHide);
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirmar(item.id, email);
    };

    return (
        <div className="modal fade" id="modalEscalonar" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Escalonar Não Conformidade</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Item:</strong> {item?.itemChecklist?.item}</p>
                            <div className="mb-3">
                                <label htmlFor="emailEscalonamento" className="form-label">Enviar para o e-mail:</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="emailEscalonamento" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="exemplo@dominio.com" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Enviar E-mail</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}