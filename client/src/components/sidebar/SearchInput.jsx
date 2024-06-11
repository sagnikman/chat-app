import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import useConversation from '../../store/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {
    const [search, setSearch] = useState('');

    const { setSelectedConversation } = useConversation();

    const { conversations } = useGetConversations();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 2) {
            return toast.error('Search text must be at least 2 characters');
        }

        const conversation = conversations.find((c) =>
            c.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            toast.error('No such user found');
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
                type="text"
                placeholder="Search"
                className="input input-bordered rounded-full hover:bg-gray-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
            >
                <IoIosSearch className="w-7 h-7 outline-none" />
            </button>
        </form>
    );
};

export default SearchInput;
