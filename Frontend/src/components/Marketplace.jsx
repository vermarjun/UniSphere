import React, { useState } from "react";

const ItemCard = ({data, card, setCard}) => {
  return (
    <div onClick={()=>{setCard(index)}} className="max-w-sm border border-neutral-700 rounded-lg overflow-hidden hover:cursor-pointer">
      <div>
        <img src={data.image} alt="Product" className="w-full h-36 object-contain bg-neutral-900"/>
      </div>
      <div className="px-2">
        <div className="py-2 flex justify-between items-center border-b">
            <span className="text-lg font-semibold">₹{data.cost}</span>
            <span className="text-neutral-500 text-xs">{data.date}</span>
        </div>
        <div className="py-2 h-10">
            <p className="text-neutral-200 text-xs line-clamp-2">
                {data.description}
            </p>
        </div>
        <div className="py-2">
            <button className="w-full bg-blue-500 rounded-full text-sm p-2 hover:bg-blue-400">Contact</button>
        </div>
      </div>
    </div>
  );
};

const items = [{
    image:"https://www.clankart.com/user-uploads/advert/Civil_Engineering_and_GATE_Preparation_Books1717048147717.jpg",
    cost:"999",
    description:"GATE prepration study material, includes previour year question papers, handwritten notes",
    department:"BTECH",
    date:"Nov 18, 2024",
  },{
  image:"https://th.bing.com/th/id/OIP.MTC8gX0tslOT8CbpgJvb2wHaFj?rs=1&pid=ImgDetMain",
  cost:"2500",
  description:"2nd hand cycle everything working",
  department:"COMMERCE",
  date:"Yesterday",
},{
  image:"https://i.ebayimg.com/images/g/UXMAAOSwrrplv7n6/s-l1600.jpg",
  cost:"1500",
  description:"Arduino kit for learning purpose, has ultrasonic sensor, battery and arduino",
  department:"BSC",
  date:"Nov 18, 2024",
},]

function Marketplace(){
    // const [card, setCard] = useState(null);
    return (
        <>
        {/* <Modal/> */}
        <div className="text-white w-full h-full flex justify-start items-center overflow-y-auto ">
            <div className="p-2 sm:ml-5 sm:w-5/6 h-full">
                <div className="h-20 flex justify-center items-center ">
                    <p className="text-5xl font-bold text-center">Market Place</p>
                </div>
                <div className="grid grid-cols-2 grid-flow-row gap-4">
                    {/* first default box */}
                    <div className="bg-neutral-900 rounded-lg flex justify-center items-center">
                        <div className="text-center w-5/6 h-full">
                            <div className="h-1/3">
                                <p className="pt-5 sm:text-2xl text-lg">Want to see your stuff here?</p>
                            </div>
                            <div className="h-1/3 sm:text-lg text-sm text-balance">
                                <p>Make some extra cash by selling things in your community. Go On, it's easy!</p>
                            </div>
                            <div className="h-1/3 flex items-end pb-5">
                                <button className="border border-white p-2 rounded-full w-full hover:bg-neutral-950 text-sm font-bold">Start Selling</button>
                            </div>
                        </div>
                    </div>
                    {/* other cards */}
                    {
                        items.map((data, index)=>{
                            return <ItemCard data={data} key={index}/>
                        })
                    }
                </div> 
            </div>  
        </div>
        </>
    )
}

export default Marketplace;
