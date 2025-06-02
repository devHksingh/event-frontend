import './App.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from 'zod';
import { Calendar, LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query';
import { getEventData } from './http/api';
import { useState } from 'react';
import EventCard from './components/EventCard';

const schema = z.object({
  searchPara: z.string().min(1,"Event location is required"),
});
interface FormFields {
  searchPara: string;
}
interface ErrorResponse{
  message:string
}
interface Event {
  title: string;
  date: {
    start_date: string;
    when: string;
  };
  address: string[];
  link: string;
  description: string;
  ticket_info: Array<{
    source: string;
    link: string;
    link_type: string;
  }>;
  venue?: {
    name: string;
    rating: number;
    reviews: number;
  };
  // venue?: {
  //   link?:string
  //   name: string;
  //   rating: number;
  //   reviews: number;
  // };
  thumbnail: string;
  image: string;
}

const App = () => {
  const [errMsg,setErrMsg]= useState("")
  const [events, setEvents] = useState<Event[]>([]);
  const mutation = useMutation({
    mutationFn:getEventData,
    onSuccess:(response)=>{
      // setEvents(response.data.data);
      console.log(response.data.data);
      response.data.data.map((item:Event)=>{
        console.log(item.venue);
        
      })
      // const non = response.data.data.filter((item:Event)=>item.venue.name === "")
      // console.log("non",non);
      setEvents(response.data.data);
      
    },
    onError:(err:AxiosError<ErrorResponse>)=>{
      const errorMeassge = err.response?.data.message || "Something went wrong.Try it again!"
      setErrMsg(errorMeassge)
      // toast
      toast.error(errMsg,{position:'top-right'})
    }
  })

  const {register,handleSubmit,formState:{errors}} = useForm<FormFields>({
    resolver:zodResolver(schema)
  })
  const onSubmit:SubmitHandler<FormFields>=(data)=>{
       
        mutation.mutate(data)

    }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sydney Events
            </h1>
            <p className="text-gray-600">
              Discover amazing events happening in Sydney, Australia
            </p>
            
          </div>
        </div>
      </header>
      
      {/* Search Section */}
      <section className="bg-white border-b border-gray-200 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 items-end  w-full">
            <div className="flex-1 w-full">
              <label htmlFor="searchPara" className="block text-sm font-medium text-gray-700 mb-2">
                Search Events
              </label>
              <input
                type="text"
                id="searchPara"
                {...register("searchPara")}
                placeholder="Events in Sydney..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.searchPara && (
                <p className="mt-1 text-sm text-red-600">{errors.searchPara.message}</p>
              )}
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={mutation.isPending}
              className="w-full md:w-[20%]  bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200 flex items-center justify-center min-w-[120px]"
            >
              {mutation.isPending ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
        <p className='max-w-4xl mx-auto px-4 text-center text-sm mb-2 font-medium'> <span className='text-red-600'>Note: </span>A single IP address is limited to searching only 5 requests every 46 minutes.</p>
      </section>
      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        {mutation.isPending && (
          <div className="text-center py-12">
            <LoaderCircle className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading events...</p>
          </div>
        )}

        {events.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Found {events.length} Events
              </h2>
              <div className="text-sm text-gray-500">
                Updated just now
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </>
        )}

        {!mutation.isPending && events.length === 0 && mutation.isIdle && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Search</h3>
            <p className="text-gray-600">
              Enter a search term above to find exciting events in Sydney
            </p>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-white bottom-0  border-t border-gray-200 mt-12 border  absolute  w-full ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>Events data taken from Google Event</p>
            
          </div>
        </div>
      </footer>
      <ToastContainer/>
    </div>
  )
}

export default App