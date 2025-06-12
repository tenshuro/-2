import styled from 'styled-components';

const genders = ['', 'Male', 'Female', 'Genderless', 'unknown'];
const statuses = ['', 'Alive', 'Dead', 'unknown'];

export function Filters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <FiltersContainer>
      <input
        name="name"
        placeholder="Search by name..."
        value={filters.name}
        onChange={handleChange}
      />

      <select name="gender" value={filters.gender} onChange={handleChange}>
        {genders.map((g) => (
          <option key={g} value={g}>
            {g || 'All Genders'}
          </option>
        ))}
      </select>

      <select name="status" value={filters.status} onChange={handleChange}>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s || 'All Statuses'}
          </option>
        ))}
      </select>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input, select {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;
