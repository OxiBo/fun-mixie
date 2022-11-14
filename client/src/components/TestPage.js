import React, { useRef } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import useForm from './customHooks/useForm';

const TestPage = () => {
  const { inputs, handleChange } = useForm({
    name: 'John Doe',
    age: 18,
    file: '',
  });

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="test">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputs);
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your age"
          id="age"
          name="age"
          onChange={handleChange}
        />
        <input
          type="file"
          placeholder="Enter your age"
          id="file"
          name="file"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>hello DATA</h3>

        {data.map((item) => (
          <p>{item.name}</p>
        ))}
      </div>
    </div>
  )
};

export default TestPage;
