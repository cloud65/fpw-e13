const getServerData = async(url)=>{ // Реализуем GET запрос
    return fetch(url)
      .then((response) => {
            return response.json(); 
      })
      .then((data) => { return data; })
      .catch(() => { return null; });
};


export const getData = async()=>{
    const data = await getServerData("api/posts");
    if (!data) return;
    const rows = data.map(row=>{
        return `<tr>
            <td>${row.id}</td><td>${row.title}</td><td>${row.author}</td>
        </tr>`;
    }).join("");
    
    return `<table><tbody>${rows}</tbody></table>`;
};