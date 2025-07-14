import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setPasswordArray] = useState([])
//updatin....
useEffect(() => {
  fetch("http://localhost:5000/all")
    .then(res => res.json())
    .then(data => {
      setPasswordArray(data);
    })
    .catch(err => console.error("Fetch error:", err));
}, []);


    const copyText = (text) => {
        toast('🦄 copy to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("/images/x.png")) {
            ref.current.src = "/images/openEye.jpg"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "/images/x.png"
            passwordRef.current.type = "text"
        }

    }
// updatin...
const savePassword = () => {
  if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
    const url = form._id
      ? `http://localhost:5000/update/${form._id}` // if _id exists, it's an update
      : "http://localhost:5000/add";               // else it's a new entry

    const method = form._id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        site: form.site,
        username: form.username,
        password: form.password
      })
    })
      .then(res => res.json())
      .then(() => {
        toast(
          form._id ? "🔁 Password Updated!" : "✅ Password Saved!",
          {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            transition: Bounce
          }
        );

        setform({ site: "", username: "", password: "" }); // clear form

        // Refresh password list
        fetch("http://localhost:5000/all")
          .then(res => res.json())
          .then(data => setPasswordArray(data));
      })
      .catch(err => {
        toast("🚫 Error saving/updating password");
        console.error("Save/Update error:", err);
      });
  } else {
    toast("⚠️ Please fill all fields properly");
  }
};



    const deletePassword = (id) => {
  const confirmDelete = confirm("Do you really want to delete this password?");
  if (!confirmDelete) return;

  fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      toast("🗑️ Password Deleted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      // Re-fetch updated list from backend
      fetch("http://localhost:5000/all")
        .then(res => res.json())
        .then(passwords => setPasswordArray(passwords));
    })
    .catch(err => {
      toast("🚫 Error deleting password");
      console.error("Delete error:", err);
    });
};

    const editPassword = (id) => {
  fetch(`http://localhost:5000/all`)
    .then(res => res.json())
    .then(data => {
      const selected = data.find(item => item._id === id);
      if (selected) {
        setform({
          site: selected.site,
          username: selected.username,
          password: selected.password,
          _id: selected._id  // save ID for later update
        });

        toast("✏️ Ready to edit!", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    })
    .catch(err => console.error("Edit fetch error:", err));
};


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full"></div>

            <div className='  p-2 md:p-0 mycontainer min-h-[80vh]'>
                <h1
                    className='text-4xl font-bold text-center'
                >
                    <span className='text-green-500'>&lt;</span>
                    PasST
                    <span className='text-green-500'>OR/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center '>Your own Password</p>
                <div className=' flex flex-col text-black p-4 gap-8 items-center'>
                    <input
                        onChange={handleChange}
                        value={form.site}
                        className='rounded-full border border-green-500 w-full p-4 py-1'
                        placeholder='Enter website url'
                        type="text" name='site' id='site' />
                    <div className='flex justify-between gap-8'>
                        <input
                            onChange={handleChange}
                            value={form.username}
                            className='rounded-full border border-green-500 w-full p-4 py-1' type="text"
                            name='username' id='username'
                            placeholder='Enter username' />
                        <div className="relative w-full">
                            <input
                                ref={passwordRef}
                                onChange={handleChange}
                                value={form.password}
                                className="rounded-full border border-green-500 w-full p-4 py-1 pr-10" // ⬅️ extra right padding for the icon
                                type="password"
                                name='password'
                                id='password'
                                placeholder="Enter Password"
                            />

                            <span
                                onClick={showPassword}
                                className="absolute right-2 top-1.5 cursor-pointer"
                            >
                                <img
                                    ref={ref}
                                    className="p-1"
                                    width={22}
                                    src="/images/openEye.jpg"
                                    alt="eye"
                                />
                            </span>
                        </div>


                    </div>

                    <button
                        onClick={savePassword}
                        className='flex gap-2 justify-center items-center bg-orange-500  hover:bg-emerald-400 hover:text-black rounded-full  px-5 py-3 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/shcfcebj.json"
                            trigger="hover"
                        >
                        </lord-icon>Add Password</button>
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div>No passwords to show</div>}
                    {passwordsArray.length != 0 &&
                        <table className="table-auto w-full mb-3">
                            <thead className='bg-emerald-800 text-white rounded-md overflow-hidden'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-emerald-50'>
                                {passwordsArray.map((items, index) => {
                                    return <tr key={index}>

                                        <td className='text-center px-4 py-2 border border-white
                                    '>
                                            <div className='flex items-center justify-center gap-2'>
                                                <a href={items.site} target='_blank'>{items.site}</a>
                                                <div className='cursor-pointer ' >
                                                    <img width={13} src="images/copy.png" onClick={() => copyText(items.site)} alt="" />
                                                </div>
                                            </div>


                                        </td>

                                        <td className='text-center  py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-2'>
                                                {items.username}
                                                <div className='cursor-pointer ' >
                                                    <img width={13} src="images/copy.png" onClick={() => copyText(items.username)} alt="" />
                                                </div>
                                            </div>

                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-2'>
                                                {items.password}
                                                <div className='cursor-pointer ' >
                                                    <img width={13} src="images/copy.png" onClick={() => copyText(items.password)} alt="" />
                                                </div>
                                            </div>


                                        </td>
                                        <td className='justify-center text-center  py-2 border border-white'>
                                            <span 
                                            onClick={()=>{editPassword(items._id)}}
                                            className='cursor-pointer mx-1'>
                                                <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                stroke="bold"
                                                colors="primary:#000000,secondary:#16c72e"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon> 
                                            </span >
                                            <span 
                                            onClick={()=>{deletePassword(items._id)}}
                                            className='cursor-pointer mx-1'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                stroke="bold"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}


                            </tbody>
                        </table>}
                </div>
            </div>


        </>
    )
}

export default Manager