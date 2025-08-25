// static/js/components/ModalNaoConformidade.js

function ModalNaoConformidade({ item, onAdicionar }) {
    const [descricao, setDescricao] = React.useState('');
    const [classificacao, setClassificacao] = React.useState('Leve');
    const [prazo, setPrazo] = React.useState('');

    // Efeito para limpar o formulário sempre que o modal for fechado
    React.useEffect(() => {
        const modalEl = document.getElementById('modalNC');
        const handleHide = () => {
            setDescricao('');
            setPrazo('');
            setClassificacao('Leve');
        };
        modalEl.addEventListener('hidden.bs.modal', handleHide);
        return () => modalEl.removeEventListener('hidden.bs.modal', handleHide);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await onAdicionar(item.id, { descricao, classificacao, prazo });
        if (success) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalNC'));
            modal.hide();
        }
    };

    return (
        <div className="modal fade" id="modalNC" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">Adicionar Não Conformidade</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Item do Checklist:</label>
                                <p><strong>{item?.item}</strong></p>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descrição da NC</label>
                                <textarea className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Classificação</label>
                                <select className="form-select" value={classificacao} onChange={e => setClassificacao(e.target.value)}>
                                    <option value="Leve">Leve</option>
                                    <option value="Média">Média</option>
                                    <option value="Grave">Grave</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Prazo</label>
                                <input type="date" className="form-control" value={prazo} onChange={e => setPrazo(e.target.value)} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}