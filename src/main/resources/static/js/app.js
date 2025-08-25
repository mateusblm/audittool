const { useState, useEffect, useCallback } = React;

function App() {
    const [checklist, setChecklist] = useState([]);
    const [naoConformidades, setNaoConformidades] = useState([]);
    const [aderencia, setAderencia] = useState({});
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [error, setError] = useState(null);

    const carregarDados = useCallback(async () => {
        try {
            const dados = await buscarDadosIniciais();
            setChecklist(dados.checklist);
            setNaoConformidades(dados.naoConformidades);
            setAderencia(dados.aderencia);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Não foi possível conectar ao backend. Verifique se a aplicação Spring Boot está rodando.");
        }
    }, []);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);
    
    const handleAdicionarItem = async (novoItem) => {
        const success = await adicionarItemChecklist(novoItem);
        if (success) {
            carregarDados();
        } else {
            alert("Erro ao adicionar item.");
        }
    };
    
    const handleAdicionarNC = async (itemId, novaNC) => {
        const success = await adicionarNaoConformidade(itemId, novaNC);
        if (success) {
            carregarDados();
            return true;
        }
        alert("Erro ao adicionar não conformidade.");
        return false;
    };
            
    const abrirModalNC = (item) => {
        setItemSelecionado(item);
        const modal = new bootstrap.Modal(document.getElementById('modalNC'));
        modal.show();
    };

    const handleResolverNC = async (id) => {
        const success = await resolverNaoConformidade(id);
        if (success) {
            carregarDados(); // Recarrega os dados para atualizar a interface
        } else {
            alert("Erro ao tentar resolver a não conformidade.");
        }
    };

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="mb-4">Sistema de Auditoria de Projetos</h1>
            
            <Aderencia dados={aderencia} />

            <div className="row">
                <div className="col-lg-4">
                    <FormularioItemChecklist onAdicionar={handleAdicionarItem} />
                </div>
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header">Checklist do Projeto</div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Status</th>
                                            <th>Responsável</th>
                                            <th>Classificação</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {checklist.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.item}</td>
                                                <td><span className={`badge ${item.status === 'SIM' ? 'bg-success' : item.status === 'NAO' ? 'bg-danger' : 'bg-secondary'}`}>{item.status.replace('_', ' ')}</span></td>
                                                <td>{item.responsavel}</td>
                                                <td>{item.classificacao}</td>
                                                <td>{item.status === 'NAO' && <button className="btn btn-warning btn-sm" onClick={() => abrirModalNC(item)}>Adicionar NC</button>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4 shadow-sm">
            <div className="card-header">Lista de Não Conformidades</div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Verificado</th>
                                <th>Descrição da NC</th>
                                <th>Responsável</th>
                                <th>Prazo</th>
                                <th>Status</th>
                                <th>Data Resolução</th> {/* <-- NOVA COLUNA */}
                                <th>Ação</th>           {/* <-- NOVA COLUNA */}
                            </tr>
                        </thead>
                        <tbody>
                            {naoConformidades.map(nc => (
                                <tr key={nc.id}>
                                    <td>{nc.itemChecklist ? nc.itemChecklist.item : 'Item não associado'}</td>
                                    <td>{nc.descricao}</td>
                                    <td>{nc.responsavel}</td>
                                    <td>{new Date(nc.prazo + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <span className={`badge ${nc.status === 'ABERTO' ? 'bg-info text-dark' : 'bg-success'}`}>
                                            {nc.status}
                                        </span>
                                    </td>
                                    {/* ADICIONE O CÓDIGO ABAIXO */}
                                    <td>
                                        {nc.dataResolucao ? new Date(nc.dataResolucao + 'T00:00:00').toLocaleDateString('pt-BR') : '---'}
                                    </td>
                                    <td>
                                        {nc.status === 'ABERTO' && (
                                            <button 
                                                className="btn btn-success btn-sm" 
                                                onClick={() => handleResolverNC(nc.id)}>
                                                Resolver
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            
            <ModalNaoConformidade item={itemSelecionado} onAdicionar={handleAdicionarNC} />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);