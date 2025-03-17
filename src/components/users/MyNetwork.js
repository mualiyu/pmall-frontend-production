import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";



function MyNetwork() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [allDownlines, setAllDownlines] = useState(null);

    const getMyNetwork = () => {
        setLoading(true);
        fetch("https://api.pmall.com.ng/api/v1/profile/hierarchy-all-downline", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            Authorization: "Bearer " + user?.token,
          },
        })
          .then((resp) => resp.json())
          .then((result) => {
            console.log(result);
           setAllDownlines(result.data.allDownline);
            setLoading(false);
            console.log(allDownlines);
          })
          .catch((err) => {
            console.log(err);
          });
          console.log(allDownlines);
      };
    
      useEffect(() => {
        getMyNetwork();
      }, []);


  return (
    <div class="tree">
	<ul>
		<li>
			<a href="#">Parent</a>
			<ul>
				<li>
					<a href="#">Child</a>
					<ul>
						<li>
							<a href="#">Grand Child</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="#">Child</a>
					<ul>
						<li><a href="#">Grand Child</a></li>
						<li>
							<a href="#">Grand Child</a>
							<ul>
								<li>
									<a href="#">Great Grand Child</a>
								</li>
								<li>
									<a href="#">Great Grand Child</a>
								</li>
								<li>
									<a href="#">Great Grand Child</a>
								</li>
							</ul>
						</li>
						<li><a href="#">Grand Child</a></li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
    </div>
  )
}

export default MyNetwork