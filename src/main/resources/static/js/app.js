const { useState, useEffect, useCallback } = React;

function App() {
    const [checklist, setChecklist] = useState([]);
    const [naoConformidades, setNaoConformidades] = useState([]);
    const [aderencia, setAderencia] = useState({});
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [itemParaEscalonar, setItemParaEscalonar] = useState(null);
    const [error, setError] = useState(null);
    const [notificacao, setNotificacao] = useState({ mensagem: '', tipo: '' });

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

    useEffect(() => {
        if (notificacao.mensagem) {
            const timer = setTimeout(() => {
                setNotificacao({ mensagem: '', tipo: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notificacao]);
    
    const handleAdicionarItem = async (novoItem) => {
        const success = await adicionarItemChecklist(novoItem);
        if (success) {
            carregarDados();
        } else {
            setNotificacao({ mensagem: 'Erro ao adicionar item.', tipo: 'danger' });
        }
    };
    
    const handleAdicionarNC = async (itemId, novaNC) => {
        const success = await adicionarNaoConformidade(itemId, novaNC);
        if (success) {
            carregarDados();
            return true;
        }
        setNotificacao({ mensagem: 'Erro ao adicionar não conformidade.', tipo: 'danger' });
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
            carregarDados(); 
            setNotificacao({ mensagem: 'Não conformidade resolvida com sucesso!', tipo: 'success' });
        } else {
            setNotificacao({ mensagem: 'Erro ao tentar resolver a não conformidade.', tipo: 'danger' });
        }
    };

    const abrirModalEscalonar = (nc) => {
        setItemParaEscalonar(nc);
        const modal = new bootstrap.Modal(document.getElementById('modalEscalonar'));
        modal.show();
    };

    const handleEscalonar = async (id, email) => {
        const success = await escalonarNaoConformidade(id, email);
        if (success) {
            carregarDados();
            setNotificacao({ mensagem: 'E-mail de escalonamento enviado com sucesso!', tipo: 'success' });
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEscalonar'));
            modal.hide();
        } else {
            setNotificacao({ mensagem: 'Falha ao enviar e-mail de escalonamento.', tipo: 'danger' });
        }
    };

    if (error) {
        return <div className="alert alert-danger m-4">{error}</div>;
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ABERTO': return 'bg-info text-dark';
            case 'RESOLVIDO': return 'bg-success';
            case 'ESCALONADO': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container">
            <Notificacao 
                mensagem={notificacao.mensagem} 
                tipo={notificacao.tipo} 
                aoFechar={() => setNotificacao({ mensagem: '', tipo: '' })} 
            />

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
                                                <td><span className={`badge ${item.status === 'SIM' ? 'bg-success' : item.status === 'NAO' ? 'bg-danger' : 'bg-secondary'}`}>{item.status.replace(/_/g, ' ')}</span></td>
                                                <td>{item.responsavel}</td>
                                                <td>{item.classificacao}</td>
                                                <td>{item.status === 'NAO' && <button style={{color: "white"}}
                                                className="btn btn-warning btn-sm" onClick={() => abrirModalNC(item)}>Adicionar NC</button>}</td>
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
                                    <th>Classificação</th>
                                    <th>Data Resolução</th> 
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                            {naoConformidades.map(nc => (
                                <tr key={nc.id}>
                                    <td>{nc.itemVerificado}</td>
                                    <td>{nc.descricao}</td>
                                    <td>{nc.responsavel}</td>
                                    <td>{new Date(nc.prazo + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        <span className={`badge ${
                                            nc.status === 'ABERTO' ? 'bg-info text-dark' :
                                            nc.status === 'RESOLVIDO' ? 'bg-success' :
                                            nc.status === 'ESCALONADO' ? 'bg-warning text-dark' : 'bg-secondary'
                                        }`}>
                                            {nc.status}
                                        </span>
                                    </td>
                                    <td>{nc.classificacao}</td>
                                    <td>{nc.dataResolucao ? new Date(nc.dataResolucao + 'T00:00:00').toLocaleDateString('pt-BR') : '---'}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                        
                                            {(nc.status === 'ABERTO' || nc.status === 'ESCALONADO') && (
                                                <button 
                                                    className="btn btn-success btn-sm" 
                                                    onClick={() => handleResolverNC(nc.id)}>
                                                    Resolver
                                                </button>
                                            )}
                                            {nc.status === 'ABERTO' && (
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => abrirModalEscalonar(nc)}>
                                                    Escalonar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <ModalNaoConformidade item={itemSelecionado} onAdicionar={handleAdicionarNC} />
            <ModalEscalonamento item={itemParaEscalonar} onConfirmar={handleEscalonar} />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);