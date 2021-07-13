export const filter = (string, query) => {
    if (string) {
        let indice = string.indexOf(query);
        let val = string.slice(indice,-1)
        return val;
      } else {
        return "";
      }
}