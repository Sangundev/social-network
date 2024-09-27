import "./topbar.css"
import {Search,Person,Chat, Notifications} from "@mui/icons-material"

export default function Topbar() {
  return (
    <div className="TopbarContainer">
      <div className="topbarleft">
          <span className="logo">K7ITSLUTION</span>
      </div>
      <div className="topbarcenter">
        <div className="searchbar">
        <Search className="seachicon"/>
        <input placeholder="Nhập thông tin cần tìm" className="searchInput" /> 
          </div>      
        </div>
      <div className="topbarright">
          <div className="topbarLinks">
            <span className="topbarlink">Trang chủ</span>
            <span className="topbarlink">Dòng thời gian</span>
          </div>
          <div className="topbarIcons">
            <div className="toparIconItem">
              <Person />
              <span className="topbarIconBadge">
                1
              </span>
            </div>
            <div className="toparIconItem">
              <Chat />
              <span className="topbarIconBadge">
                2
              </span>
            </div>
            <div className="toparIconItem">
              <Notifications />
              <span className="topbarIconBadge">
                1
              </span>
            </div>
          </div>
          <img src="https://m.media-amazon.com/images/I/910QqHLOGRL.jpg" alt="" className="topbarImg" />
        </div>
        
    </div>
  )
}
