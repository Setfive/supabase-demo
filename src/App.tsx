import {useEffect, useState} from 'react'
import { Form, Field } from 'react-final-form'
import Lottie from 'react-lottie-player'
import './App.css'
import {createClient} from '@supabase/supabase-js'
import {Database} from "./types/supabase.ts";
import lottieLoading from "./assets/loading.json";

type ICocktail = Database['public']['Tables']['cocktails']['Row'];
type ICategoryCount = Database['public']['Views']['cocktails_by_category']['Row'];
const supabase = createClient<Database>('https://twwcbxpvkqxyutpirtbg.supabase.co', import.meta.env.VITE_SUPABASE_KEY);

async function getData() {

  const result = await supabase.from('cocktails')
    .select('*')
    .range(0, 25)
    .order('id', {ascending: false});

  if (result.error) {
    console.error(result.error);
    alert("An error occurred. Check the console.");
  }

  const statResult = await supabase.from('cocktails_by_category').select('*');

  if (statResult.error) {
    console.error(statResult.error);
    alert("An error occurred. Check the console.");
  }

  return {data: result.data, stats: statResult.data};
}

const required = (value: unknown) => (value ? undefined : 'Required')

function App() {
  const [isLoading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState<ICocktail[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<ICategoryCount[]>([]);

  const onSubmit = async (values: {name: string}) => {
    const r = await supabase.from('cocktails').insert({name: values.name});
    getData().then(result => {
      if (result.data) {
        setCocktails(result.data);
      }
    });
  };

  useEffect(() => {
    getData().then(result => {
      if (result.data) {
        setCocktails(result.data);
      }
      if(result.stats) {
        setCategoryCounts(result.stats);
      }

      setTimeout(() => setLoading(false), 5000);
    });
  }, []);

  return (
    <>
      {isLoading && <Lottie
          loop
          animationData={lottieLoading}
          play
          style={{ width: 150, height: 150 }}
      />}
      <div className={isLoading ? 'hidden' : ''}>
        <div className="container">
          <div className="cocktail-table">
            <table>
              <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
              </thead>
              <tbody>
              {cocktails.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="cocktail-table">
            <table>
              <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
              </thead>
              <tbody>
              {categoryCounts.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={isLoading ? 'hidden' : ''}>
        <div className="form-container">
          <Form
            onSubmit={onSubmit}
            render={({handleSubmit, form, submitting, pristine, values}) => (
              <form onSubmit={handleSubmit}>
                <Field name="name" validate={required}>
                  {({input, meta}) => (
                    <div>
                      <label>Name</label>
                      <input {...input} type="text" placeholder="Name"/>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}>
                    Reset
                  </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default App
