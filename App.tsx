import * as React from 'react';
import './style.css';

export default function App() {
  let x = [
    { a: 'Java' },
    { b: 'JavaScript' },
    { c: 'React' },
    { c: 'React' },
    { b: 'JavaScript' },
  ];

  const [res, setRes] = React.useState([]);
  const [searchRes, setSearchRes] = React.useState([]);

  // const getResults = async () => {
  //   const response = [];
  //   await
  // };

  React.useEffect(() => {
    const response = [];
    fetch('https://jsonplaceholder.typicode.com/users').then((res) => {
      res.text().then((res) => {
        JSON.parse(res).map((item) => {
          response.push({
            name: item.name,
            email: item.email,
            city: item.address.city,
          });
        });
        setRes(response);
        setSearchRes(response);
      });
    });
  }, []);

  const onSearch = (e) => {
    const newRes = res.filter((item) => {
      console.log(item.name.includes(e.target.value));
      if (item.name.toLowerCase().includes(e.target.value)) {
        return item;
      }
    });
    setSearchRes(newRes);
  };

  return (
    <div>
      <input type="text" onChange={onSearch} />
      <table>
        <th>
          <td>Name</td>
          <td>Email</td>
          <td>city</td>
        </th>
        {searchRes.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.city}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
