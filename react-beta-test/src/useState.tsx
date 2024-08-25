import  React, {useState} from 'react';



type userType = {
    name: string,
    sessionId: number,
}
const useStateExample = ()=> {
const [username, setUsername] = useState('');
const [user, setUser] = useState<userType | null>(null);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
console.log(e.target.value);
}


const handleClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
setUser({
name: username,
sessionId: Math.random(),
});
console.log('worked');
};

return (
<>
<div className='useStateExample'>
    {user ? ( 
    `${user.name} logged in`
    ) : (
<form>
    <input type='text' placeholder='UserName' onChange={handleChange}/>
    <button onClick={handleClick}>Login</button>
</form>
    )}
    {user?.name}
</div>

</>

);
};

export default useStateExample;