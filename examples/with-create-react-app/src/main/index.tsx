import React from 'react';
import type Tracker from '@openreplay/tracker';
import { create } from 'zustand';
import trackerZustand from '@openreplay/tracker-zustand';
import { observer } from "mobx-react-lite" // Or "mobx-react".
import clickerStore from '../mobxStore'
import { getTracker } from '../tracker';
import './App.css';
import MuiStyled from './MuiStyled';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dashboard } from './Dashboard.component';
import ky from 'ky';

const { tracker: trackerEx, axiosInst, store } = getTracker();

const api = ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('test-header-ignored', `this is a very nice but yet ignored header`);
      }
    ]
  }
})

// const zustandPlugin = trackerEx.use(trackerZustand());

// const bearStoreLogger = zustandPlugin('bear_store');

// const useBearStore = create(
//   bearStoreLogger((set: any) => ({
//     bears: 0,
//     increasePopulation: () => set((state: any) => ({ bears: Number(state.bears) + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//   }))
// );

const MainPage: React.FC = () => {
  const [view, setView] = React.useState('main');
  const [tracker, setTracker] = React.useState<Tracker>(null);
  const [counter, setCounter] = React.useState(store.getState().value);
  const [data] = React.useState(() => [...defaultData]);
  const [shouldRerender] = React.useState(false);
  const [sRen, setRen] = React.useState(true);
  const [sUrl, setURL] = React.useState('');
  const rerender = React.useReducer(() => ({}), {})[1];
  const zustandStore = { bears: 1, increasePopulation: () => 1 } //useBearStore();
  const [input, setInput] = React.useState('');
  store.subscribe(() => {
    setCounter(store.getState().value);
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    console.log('starting t')
    if (!trackerEx.isActive() && !tracker) trackerEx
      .start()
      .then((session) => {
        console.log(session);
        const url = trackerEx.getSessionURL();
        setURL(url ?? '');
        setTracker(trackerEx);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      trackerEx.stop();
      setTracker(undefined);
    };
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      shouldRerender && rerender();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [rerender, shouldRerender]);

  if (!sRen)
    return (
      <div>
        <button
          onClick={() => {
            setRen(true);
          }}
        >
          test
        </button>
        test
      </div>
    );

  const networkCall = (path) => {
    return fetch(path)
      .then(resp => {
        console.log(resp)
        return resp;
      })
      .then(async (r) => await r.json())
      .then((p) => {
        console.log(p);
      });
  }

  const testAPI = (): void => {
    void networkCall('https://pokeapi.co/api/v2/pokemon/ditto');
  };

  const testAPIError = (): void => {
    void networkCall('https://pokeapi.co/api/v2/poakemon/ditto');
  };

  const incrementRedux = (): void => {
    store.dispatch({ type: 'counter/incremented' });
  };
  const redux2 = (): void => {
    store.dispatch({ type: 'counter/test' });
  };
  const redux3 = (): void => {
    store.dispatch({ type: 'counter/test2' });
  };
  const redux4 = (): void => {
    store.dispatch({ type: 'counter/test3' });
  };

  const customEvent = (): void => {
    tracker?.event('test', 'event');
  };

  const customIssue = () => {
    tracker?.issue("test", { test: 'data '});
  }

  const customError = (): void => {
    tracker?.handleError(new Error(), { testing: 'stuff', taha: 'is cool' });
  };

  const testJSError = (): void => {
    throw new Error('Im the error');
  };


  const testAxiosApi = (): void => {
    void axiosInst('https://pokeapi.co/api/v2/pokemon/ditto', { headers: { 'test-header': 'test-value'} }).then((p) => {
      console.log('answer', p);
    }).catch(e => console.error('error', e));
    void axiosInst('/ditto').then((p) => {
      console.log('answer', p);
    }).catch(e => console.error('error', e));
    void axiosInst.post('https://pokeapi.co/api/v2/pokemon/ditto', { test: 'haha' }).then((p) => {
      console.log('answer post', p);
    }).catch(e => console.error('post error', e));
  };
  const testZustand = (): void => {
    zustandStore.increasePopulation();
  };
  const testky = async () => {
    const r = await api.get('https://pokeapi.co/api/v2/pokemon/ditto')
    console.log('kyswer', r)
  }

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <button
        onClick={() => {
          tracker?.handleError(new Error(), { testing: 'stuff', taha: 'is cool' });
          setRen(false);
          tracker?.handleError(new Error(), { testing: 'stuff', taha: 'is cool' });
          tracker?.handleError(new Error(), { testing: 'stuff', taha: 'is cool' });
        }}
      >
        test rerender
      </button>
      <button onClick={testAPI}>test api</button>
      <button onClick={testAPIError}>test api error</button>
      <button onClick={incrementRedux}>test Redux {counter}</button>
      <button onClick={customEvent}>test custom event</button>
      <button onClick={customError}>test custom tags error</button>
      <button onClick={testAxiosApi}>test axios</button>
      <button onClick={testky}>test ky</button>
      <button onClick={testZustand}>zustand {zustandStore.bears}</button>
      <a href="https://google.com">test link</a>
      <br />
      <button onClick={redux2}>test Redux {counter}</button>
      <button onClick={redux3}>test Redux {counter}</button>
      <button onClick={redux4}>test Redux {counter}</button>
      <button onClick={testJSError}>JS Error</button>
      <button onClick={customIssue}>issue</button>
      <button onClick={() => window.open('http://localhost:3000/', '_blank')}> duplicate </button>
      <input
        id="visible-input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        placeholder={'visible input'}
      />
      <input type="checkbox" />
      <button onClick={clickerStore.increment}>mobx store {clickerStore.clicks}</button>
      <br />
      <button
        id={'get-main'}
        onClick={() => {
          setView('main');
        }}
      >
        main
      </button>
      <button
        id={'get-table'}
        onClick={() => {
          setView('table');
        }}
      >
        table
      </button>
      {view} view
      <button onClick={() => trackerEx.stop()}>stop tracker</button>
      <div className="App h-full" style={{ height: '75vh' }}>
        <MuiStyled />
        {view === 'main' ? (
          <Dashboard sUrl={sUrl} />
        ) : (
          <div className="p-2" style={{ display: 'flex' }}>
            <table>
              <thead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: { id: React.Key | null | undefined; headers: any[] }) => (
                    <tr key={`${String(headerGroup.id)}${Math.random().toString(36)}`}>
                      {headerGroup.headers.map(
                        (header: {
                          id: React.Key;
                          isPlaceholder: boolean;
                          column: { columnDef: { header: any } };
                          getContext: () => any;
                        }) => (
                          <th key={`${header.id}${Math.random().toString(36)}`}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        )
                      )}
                    </tr>
                  ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows.map(
                    (row: { id: React.Key | null | undefined; getVisibleCells: () => any[] }) => (
                      <tr key={`${String(row.id)}${Math.random().toString(36)}`}>
                        {row
                          .getVisibleCells()
                          .map(
                            (cell: {
                              id: React.Key;
                              column: { columnDef: { cell: any } };
                              getContext: () => any;
                            }) => (
                              <td key={`${cell.id}${Math.random().toString(36)}`}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            )
                          )}
                      </tr>
                    )
                  )}
              </tbody>
              <tfoot>
                {table
                  .getFooterGroups()
                  .map((footerGroup: { id: React.Key | null | undefined; headers: any[] }) => (
                    <tr key={`${String(footerGroup.id)}${Math.random().toString(36)}`}>
                      {footerGroup.headers.map(
                        (header: {
                          id: React.Key;
                          isPlaceholder: boolean;
                          column: { columnDef: { footer: any } };
                          getContext: () => any;
                        }) => (
                          <th key={`${header.id}${Math.random().toString(36)}`}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.footer, header.getContext())}
                          </th>
                        )
                      )}
                    </tr>
                  ))}
              </tfoot>
            </table>
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup: { id: React.Key; headers: any[] }) => (
                  <tr key={`${headerGroup.id}${Math.random().toString(36)}`}>
                    {headerGroup.headers.map(
                      (header: {
                        id: React.Key;
                        isPlaceholder: boolean;
                        column: { columnDef: { header: any } };
                        getContext: () => any;
                      }) => (
                        <th key={`${header.id}${Math.random().toString(36)}`}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      )
                    )}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows.map((row: { id: React.Key; getVisibleCells: () => any[] }) => (
                    <tr key={`${row.id}${Math.random().toString(36)}`}>
                      {row
                        .getVisibleCells()
                        .map(
                          (cell: {
                            id: React.Key;
                            column: { columnDef: { cell: any } };
                            getContext: () => any;
                          }) => (
                            <td key={`${cell.id}${Math.random().toString(36)}`}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          )
                        )}
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup: { id: React.Key; headers: any[] }) => (
                  <tr key={`${footerGroup.id}${Math.random().toString(36)}`}>
                    {footerGroup.headers.map(
                      (header: {
                        id: React.Key;
                        isPlaceholder: boolean;
                        column: { columnDef: { footer: any } };
                        getContext: () => any;
                      }) => (
                        <th key={`${header.id}${Math.random().toString(36)}`}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.footer, header.getContext())}
                        </th>
                      )
                    )}
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="h-4" />
          </div>
        )}
      </div>
    </>
  );
};

export default observer(MainPage)

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: Math.floor(Math.random() * 100),
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const testArr = [...defaultData];

for (let i = 0; i < 30; i++) {
  defaultData.push(...testArr);
}

const columns: Array<ColumnDef<Person>> = [
  {
    accessorKey: 'firstName',
    cell: (info: { getValue: () => any }) => info.getValue(),
    footer: (info: { column: { id: any } }) => info.column.id,
  },
  {
    accessorFn: (row: { lastName: any }) => row.lastName,
    id: 'lastName',
    cell: (info: { getValue: () => any }) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info: { column: { id: any } }) => info.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: (info: { column: { id: any } }) => info.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    footer: (info: { column: { id: any } }) => info.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: (info: { column: { id: any } }) => info.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: (info: { column: { id: any } }) => info.column.id,
  },
];
