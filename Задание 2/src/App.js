import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Filters } from './components/Filters';
import { ItemsGrid } from './components/ItemsGrid';
import { Loader } from './components/common/Loader';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ name: '', gender: '', status: '' });
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState(null); // для пагинации (из API)
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (filters.name) params.append('name', filters.name);
        if (filters.gender) params.append('gender', filters.gender);
        if (filters.status) params.append('status', filters.status);
        params.append('page', page);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${params}`);
        const data = await res.json();

        if (data.error) {
          setCharacters([]);
          setInfo(null);
          setError('Персонажи не найдены');
        } else {
          setCharacters(data.results);
          setInfo(data.info);
        }
      } catch (err) {
        setError('Ошибка загрузки персонажей');
        setCharacters([]);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // сбрасываем на первую страницу при изменении фильтра
  };

  return (
    <Container>
      <h1>Rick and Morty Gallery</h1>
      <Filters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <ItemsGrid items={characters} />
          <Pagination>
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              ← Предыдущая
            </button>
            <span>Страница {page}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={!info || !info.next}>
              Следующая →
            </button>
          </Pagination>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background: #1c1e26;
  min-height: 100vh;
  color: #fff;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 16px;

  button {
    background: #2d3a57;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`;

export default App;
