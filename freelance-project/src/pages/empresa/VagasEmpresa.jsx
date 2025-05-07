import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListagemProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Recuperar o FirebaseUid do localStorage
        const firebaseUid = localStorage.getItem('firebaseUid');
        if (firebaseUid) {
            // Buscar os Projetos cadastrados usando o FirebaseUid
            fetchProjetos(firebaseUid);
        } else {
            setError('ID da empresa não encontrado no localStorage');
            setLoading(false);
        }
    }, []);

    const fetchProjetos = async (firebaseUid) => {
        try {
            // Corrigindo a URL da requisição para o backend
            const response = await axios.get(`http://localhost:5000/api/empresa/vagas?firebaseUid=${firebaseUid}`);
            console.log(response.data);

            // Como a resposta do backend tem uma chave 'vagas', acessamos essa chave
            setProjetos(response.data.vagas);
        } catch (err) {
            setError('Erro ao carregar os projetos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Carregando Projetos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Projetos Cadastrados</h1>
            <ul>
                {projetos.length > 0 ? (
                    projetos.map((projeto) => (
                        <li key={projeto.projectId}>
                            <h3>{projeto.projectName}</h3>
                            <p><strong>Empresa:</strong> {projeto.companyName}</p>
                            <p><strong>Descrição:</strong> {projeto.description}</p>
                            <p><strong>Data de Criação:</strong> {new Date(projeto.createdAt).toLocaleDateString()}</p>
                            <p><strong>Valor Mínimo:</strong> R${projeto.minValue}</p>
                            <p><strong>Data de Fechamento:</strong> {new Date(projeto.projectClosure).toLocaleDateString()}</p>
                            <p><strong>Habilidades Requeridas:</strong> {projeto.skills.join(', ')}</p>
                        </li>
                    ))
                ) : (
                    <p>Não há projetos cadastrados para sua empresa.</p>
                )}
            </ul>
        </div>
    );
};

export default ListagemProjetos;
