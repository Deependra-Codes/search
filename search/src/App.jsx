import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Loading from "./Loading";
import MiniSearch from "minisearch";

let miniSearch = new MiniSearch({
  fields: ["title"],
  storeFields: ["title"],
  processTerm: (term) => term.toLowerCase(),
});
const App = () => {
  const [Txt, SetTxt] = useState("");
  const [Founduser, setfuser] = useState([]);
  const [user, setuser] = useState([]);

  const SearchHandler = (e) => {
    SetTxt(e.target.value);
  };
  useEffect(() => {
    miniSearch.addAll(user);
  }, [user]);

  useEffect(() => {
    const fetchuser = async () => {
      const Response = await fetch("https://fakestoreapi.com/products");
      const data = await Response.json();
      setuser([...data]);
    };
    fetchuser();
  }, []);

  useEffect(() => {
    if (Txt) {
      const search = miniSearch.search(Txt, {
        prefix: true,
        fuzzy: 0.6,
        combineWith:"AND",
      }); 
      setfuser(search);   
    }
  }, [Txt]);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center border-y-indigo-200">
      {user.length !== 0 ? (
        <div className="main flex flex-col w-[40%] bg-gray-100 cursor-pointer">
          <div className="flex justify-between items-center rounded-[10px] border-1 hover:bg-gray-200 h-10">
            <input
              onChange={SearchHandler}
              value={Txt}
              placeholder="Search"
              className="flex-1 outline-0 pl-3"
            />
            <Search className="pr-2" />
          </div>

          {Txt && (
            <div className="bg-gray-100 border-b-[1px] border-b-gray-400 rounded-b-[7px]">
              {Founduser.length !== 0 ? (
                <div className="flex flex-col gap-3 max-h-70 justify-between overflow-y-scroll">
                  {Founduser.map((frr) => (
                    <div
                      key={frr.id}
                      className="flex justify-between items-center gap-2 text-l hover:bg-gray-200 pl-2"
                    >
                      <Search className="pr-2" />
                      <h1 className="flex-1 text-lg">{frr.title}</h1>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-2 h-[35px] flex items-center hover:bg-gray-200">
                  <h1>Nothing Found</h1>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default App;
