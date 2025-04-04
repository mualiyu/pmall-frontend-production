import React, { useEffect, useState } from "react";
import Groups2Icon from '@mui/icons-material/Groups2';
import SchoolIcon from '@mui/icons-material/School';
import MovingIcon from '@mui/icons-material/Moving';

function LeadershipRank() {

  return (
    <>
    <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
            <div className="w-full flex justify-between items-center">
                <div className="space-y-2">
                    <h1 className="text-xl font-bold mt-lg">Leadership Ranks</h1>
                </div>
            </div>

        <div className="flex mt-10 adsfjyeee" style={{justifyContent: "space-evenly"}}>
        <div className="flex alc">
          <div className="flex alc label">
            <>
            <Groups2Icon/>
            Point Values:
            </>
            </div> &nbsp; &nbsp;
          <div className="">800</div>
        </div>
        <div className="flex">
          <div className="flex alc label">
            <>
            <SchoolIcon/>Current Rank: 
            </>
          </div>&nbsp; &nbsp;
          <div className=" c-success">Member</div>
        </div>
        <div className="flex">
           <div className="flex alc label">
              <>
              <MovingIcon/> Next Rank: 
              </>
            </div>&nbsp; &nbsp;
          <div className="">Elite Manager</div>
        </div>
      </div>

      <h3 className="uppercase c-red mt-10 mx-md">Qualifying Stages</h3>
          <div className="row">
            {/* <div className="cell uppercase bold">S/N</div> */}
            <div className="cell uppercase bold">Stage</div>
            <div className="cell uppercase bold">How to Qualify</div>
            <div className="cell uppercase bold">Incentive</div>
          </div>
          <div className="row">
          {/* <div className="cell">1</div> */}
          <div className="cell">Influencer</div>
            <div className="cell">25,000 Point Values (PVs)</div>
            
            <div className="cell">2 Million Naira in Cash</div>
            
          </div>
          <div className="row">
          {/* <div className="cell">2</div> */}
            <div className="cell">Manager</div>
            <div className="cell">60,000 Point Values(PVs)</div>
            
            <div className="cell">
              4 Million Naira in Cash
            </div>
            
          </div>
          <div className="row">
          {/* <div className="cell">3</div> */}
            <div className="cell">Elite Manager</div>
            <div className="cell">100,000 Point Values (PVs)</div>
            <div className="cell">
              7 Million Naira in Cash + 2 Million Naira Int'l Trip
            </div>
            
          </div>
          <div className="row">
            {/* <div className="cell">4</div> */}
            <div className="cell">Director</div>
            <div className="cell">250,000 Point Values (PVs)</div>
            <div className="cell">
              10 Million Naira in Cash + Any Saloon Car
            </div>
          </div>
          <div className="row">
            {/* <div className="cell">5</div> */}
            <div className="cell">Diamnond Director</div>
            <div className="cell">500,000 Point Values (PVs)</div>
            <div className="cell">
              40 Million Naira in Cash
            </div>
          </div>
          <div className="row">
            {/* <div className="cell">6</div> */}
            <div className="cell">Ambassador</div>
            <div className="cell">1,000,000 Point Values (PVs)</div>
            <div className="cell">
              70 Million Naira in Cash
            </div>
          </div>
          <h3 className="mt-10 text-center" style={{marginTop: '5%'}}>Note:  40 : 40 : 20    Balancing is required for all qualification <a className="c-red"> What is this? </a></h3>

      </div>

        </>
  )
}

export default LeadershipRank