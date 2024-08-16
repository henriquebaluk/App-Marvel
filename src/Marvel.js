import React, { useState, useEffect } from 'react'; // Importa hooks do React
import axios from 'axios'; // Importa axios para fazer requisições HTTP
import md5 from 'md5'; // Importa md5 para gerar hash
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap'; // Importa componentes do React-Bootstrap

const PUBLIC_KEY = '593e38764c698da848094b2dda3d9d15'; // Chave pública da API Marvel
const PRIVATE_KEY = 'f8a22a0bec741597407e7e8191410f1d7b1d01cf'; // Chave privada da API Marvel
const BASE_URL = 'https://gateway.marvel.com/v1/public'; // URL base 

function Marvel() {
  const [characters, setCharacters] = useState([]); // Estado para armazenar personagens
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchCharacters = async () => { // Função para buscar personagens
      const ts = new Date().getTime(); // Timestamp atual
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); // Gera hash MD5 para autenticação

      try {
        // Faz a requisição para a API Marvel
        const response = await axios.get(`${BASE_URL}/characters`, {
          params: {
            ts,
            apikey: PUBLIC_KEY,
            hash,
            limit: 10, // Limita a quantidade de resultados
          },
        });
        setCharacters(response.data.data.results); // Armazena os personagens no estado
        setError(null); // Limpa o erro
      } catch (error) {
        console.error('Erro ao buscar personagens da Marvel:', error.response ? error.response.data : error.message); // Loga o erro no console
        setError('Ocorreu um erro ao buscar os personagens da Marvel.'); // Define a mensagem de erro
      } finally {
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchCharacters(); // Chama a função de busca de personagens
  }, []); // Executa a função uma vez quando o componente é montado

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">Marvel Characters</Card.Title>
              {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto" />} {/* Exibe o spinner enquanto carrega */}
              {error && <Alert variant="danger" className="text-center">{error}</Alert>} {/* Exibe mensagem de erro, se houver */}
              <Row>
                {characters.map((character) => (
                  <Col md={6} key={character.id} className="mb-4">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                      <Card.Body>
                        <Card.Title>{character.name}</Card.Title>
                        <Card.Text>
                          {character.description ? character.description : 'Nenhuma descrição disponível'} {/* Exibe descrição ou mensagem alternativa */}
                        </Card.Text>
                        <Card.Text>
                          <small>Quadrinhos disponíveis: {character.comics.available}</small><br/>
                          <small>Series disponíveis: {character.series.available}</small>
                        </Card.Text>
                        <Button variant="primary" href={`https://www.marvel.com/characters/${character.name}`} target="_blank">
                          Saber Mais
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Marvel;
