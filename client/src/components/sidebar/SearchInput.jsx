import { IoIosSearch } from "react-icons/io";
const SearchInput = () => {
    return (
        <form className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search"
                className="input input-bordered rounded-full hover:bg-gray-900"
            />
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
            >
                <IoIosSearch className='w-7 h-7 outline-none'/>
            </button>
        </form>
    );
};

export default SearchInput;
