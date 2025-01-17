
export function DashBoard(){
    return <div>
        <div className=" w-full pl-5 pb-6 pt-4 shadow-xl border-slate-800  rounded-lg flex justify-between">
            <div className="text-5xl pr-5 font-serif">
                paytm 
            </div>
            <div className="flex w-44 justify-center">
                <div className="text-2xl font-medium pt-1 mr-3  ">
                    Hello
                </div >
                <div className="rounded-full h-10 w-10 flex items-center flex-col font-bold justify-center text-2xl cursor-pointer bg-white">
                    U
                </div>
            </div>
        </div>
        <div className="mt-6">
            <input type="text" placeholder="searh user" className="w-[98vw] p-2 rounded-md shadow-lg h-9 ml-4 outline-none  "/>
        </div>
        <div>
            
        </div>
    </div>
}