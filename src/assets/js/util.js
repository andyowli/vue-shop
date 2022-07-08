//colums 表头,Array=[{}]
//list 是table的数据 [{}]
export function export2Execl(colums,list){
    require.ensure([],() =>{
        const {export_json_to_excel} = import('../../views/excel/Export2Excel');
        let tHeader = [];
        let filterVal = [];
        console.log(colums);
        if(!colums){
            return;
        }
        colums.forEach(item =>{
            tHeader.push(item.title);
            filterVal.push(item.key);
        })
        const data = list.map(v => filterVal.map(j => v[j]));
        export_json_to_excel(tHeader,data);
    })
}

