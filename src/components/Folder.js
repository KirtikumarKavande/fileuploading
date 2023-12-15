import Item from "./Item";

const Folder = ({ data }) => {
  const addNewFolder=(item,index)=>{
    data.find()
console.log(item,index)
  }
  return (
    <div>
      {data.map((item, index) => (
        <div className="flex ">
          <Item key={index} name={item.name}>
           <div className="pl-4">{item.children && <Folder data={item.children} />}</div> 
          </Item>
          {item.type === "folder" && <div onClick={()=>{addNewFolder(item,index)}}>add folder</div>}
        </div>
      ))}
    </div>
  );
};

export default Folder;
 