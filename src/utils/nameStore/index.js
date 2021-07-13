export const nameStore = (store, id) => {
    const resultado = store.find( item => item.profile.id.toString() === id.toString() );
    return resultado;
  };
  