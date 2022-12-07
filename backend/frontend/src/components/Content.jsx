import '../styles/content.css'
import TableOfContent from './TableOfContent';
import '../styles/tableOfContent.css'

const MainContent = () => {

  return (
    <div class="wrapper">
      <div className='content'>
        
        <h1><strong><em>Overview</em></strong></h1>
          <br></br>
        <h2 id="initial-header"><strong><em>Amenities At a Glance</em></strong></h2>
          <br></br>

        <h3 id="second-header"><b>Search Amenity</b></h3>
          <br></br>
            <ol align='left'>
              <li> To search for an amenity go to the home page and click on anyone of the buttons shown below</li>
              <li> Once you click on an amenity(let’s say parking lot), you will be able to see all the places to park your vehicle in the nearby area</li>
              <li> Click on the any one of red icons to perform further actions on the amenity</li>
              <li> If you press the same amenity button again, all the icons for the particular amenity will be removed from the google map 
                   Also if you want to search for multiple amenities, click on all the required buttons to initiate the search and view all the desired amenities at once.</li>
                   
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/BYOg8ivB" target="_blank"><img src="https://images2.imgbox.com/d2/c3/BYOg8ivB_o.png" alt="image host" /></a> 
                <a href="https://imgbox.com/QcH1KTcK" target="_blank"><img src="https://images2.imgbox.com/f8/0d/QcH1KTcK_o.png" alt="image host" /> </a> 
                <a href="https://imgbox.com/gCS7qiDZ" target="_blank"><img src="https://images2.imgbox.com/64/12/gCS7qiDZ_o.png" alt="image host" /></a>
              </div>
            
            <br></br> <br></br> 
        <h3 id="third-header"><b>Navigation for Amenities</b></h3> 
          <br></br>      
            <ol align='left'>
              <li> In order to navigate to an amenity follow the steps given for searching an amenity and perform the below actions</li>
              <li> Click on any one of the markers on the Google map to open the side drawer and the selected amenity marker will be highlighted on selection</li>
              <li> Further click on the Show Path Button to navigate to the amenity. The map will zoom in and show a detailed path to the destination from the current location</li>
              <li> Click on the cross button on the top right corner to remove the navigation path and to search for another place. </li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/sOGkHZ1J" target="_blank"><img src="https://images2.imgbox.com/76/e5/sOGkHZ1J_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/MF3Eqgyp" target="_blank"><img src="https://images2.imgbox.com/7f/49/MF3Eqgyp_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/KXNQiixx" target="_blank"><img src="https://images2.imgbox.com/f9/1c/KXNQiixx_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/diDTsfAu" target="_blank"><img src="https://images2.imgbox.com/1b/9e/diDTsfAu_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/1AE9gigH" target="_blank"><img src="https://images2.imgbox.com/65/51/1AE9gigH_o.png" alt="imgbox"/></a>
              </div>
            
          <br></br> <br></br> 
        <h3 id="fourth-header"><b>Browse Amenities in other Locations</b></h3>
          <br></br>  
            <ol align='left'>
              <li> In order to browse amenities in a different location you can use the search bar to search for a location. 
                   Enter the address you can select the exact address of the location from the drop-down </li>
              <li> Once you select the address from the drop-down, you will be redirected to the desired location</li>
              <li> Click on the preferred amenity which you want to search in the vicinity and the available places will be populated on the G-Maps.</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/PKq3egOI" target="_blank"><img src="https://images2.imgbox.com/fa/a7/PKq3egOI_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/9kziGytR" target="_blank"><img src="https://images2.imgbox.com/61/8a/9kziGytR_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/aZddCjpF" target="_blank"><img src="https://images2.imgbox.com/f6/04/aZddCjpF_o.png" alt="imgbox"/></a>
              </div>
            <br></br> <br></br> 
        <h3 id="fifth-header"><b>G-Maps Navigation</b></h3>
          <br></br> 
            <ol align='left'>
              <li> To navigate on google maps open one of the amenities and click on any one of the icons to open the side drawer</li>
              <li> In the side drawer select the button G-Maps Nav to open the navigation using google maps(redirects).</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/W54BHzsI" target="_blank"><img src="https://images2.imgbox.com/b9/61/W54BHzsI_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/yoHbqpEM" target="_blank"><img src="https://images2.imgbox.com/a8/2e/yoHbqpEM_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/HlzFnHAf" target="_blank"><img src="https://images2.imgbox.com/9a/2c/HlzFnHAf_o.png" alt="imgbox"/></a>
              </div>
          <br></br><br></br> 
        <h2 id="sixth-header"><strong><em>Account Setup</em></strong></h2>
          <br></br>
        
        <h3 id="seventh-header"><b>Sign-up and Registration</b></h3>
          <br></br>  
            <ol align='left'>
              <li> To create an account, click on the “Login” button on the top right corner</li>
              <li> In case of a new user account, click on the “SIGN UP HERE” mentioned on the bottom of the page</li>
              <li> Enter your details starting from email ID, username, password(must be 8 characters long and should contain Upper case, 
                   Lower case, Number and Special Characters at least 1 for each character type)</li>
              <li> After you are done entering details, click on the sign up button to review activation email on the email ID. 
                   Check your email ID for validation email and enter the 6 Digit OTP within 10 mins for account validation </li>
              <li> Once you enter the OTP click on verify to create your account successfully.</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/q3x7XfO6" target="_blank"><img src="https://images2.imgbox.com/96/e9/q3x7XfO6_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/DGW2M6de" target="_blank"><img src="https://images2.imgbox.com/bd/50/DGW2M6de_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/5jIxWfRp" target="_blank"><img src="https://images2.imgbox.com/20/c4/5jIxWfRp_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/Hz9uWB4Q" target="_blank"><img src="https://images2.imgbox.com/0a/41/Hz9uWB4Q_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h3 id='eight-header'><b>Account Activation</b></h3>
          <br></br> 
            <ol align='left'>
              <li> Continuing from account creation, account validation goes hand in hand with creation. Once you enter the OTP for account verification, 
                   you will be redirected to the Sign-In Page and will see a message “Email Verified” in case of successful validation</li>
              <li> Now you can login using your credentials(Email ID and Password to Sign-In). </li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/nK5GYYsP" target="_blank"><img src="https://images2.imgbox.com/73/b5/nK5GYYsP_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h3 id='ninth-header'><b>User Account Login</b></h3>
          <br></br> 
            <ol align='left'>
              <li> To Sign-in to your account, click on the Login button on the top right corner of the page</li>
              <li> Now enter your email ID and password and click on the Login Button to Sign-In to your user account</li>
              <li> Once you are Logged-In you will be redirected to the Homepage and will see a message “Login-Successful”.</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/ek04KHyU" target="_blank"><img src="https://images2.imgbox.com/d0/e0/ek04KHyU_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/h1dbGG7D" target="_blank"><img src="https://images2.imgbox.com/c0/73/h1dbGG7D_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/NiwN69zE" target="_blank"><img src="https://images2.imgbox.com/84/87/NiwN69zE_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h3 id='tenth-header'><b>Forgot Password</b></h3>
          <br></br> 
            <ol align='left'>
              <li> Click on the Login Button on the top right corner to open the Login page</li>
              <li> Click on "RESET HERE" next to Forgot Password on the botttom of the Login Page </li>
              <li> Enter your registered email ID to send the verification email</li>
              <li> Enter the verification OTP to verify identity and confirm by click the button</li>
              <li> Enter your password(min 8 digit with atleast 1 Capital, 1 small, 1 number and 1 special character)</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/2tpWysgo" target="_blank"><img src="https://images2.imgbox.com/62/e5/2tpWysgo_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/mfxjn9Sh" target="_blank"><img src="https://images2.imgbox.com/68/99/mfxjn9Sh_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/x4GrFTMS" target="_blank"><img src="https://images2.imgbox.com/a3/69/x4GrFTMS_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/cRggtHwc" target="_blank"><img src="https://images2.imgbox.com/a2/8d/cRggtHwc_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/rC9Z7inP" target="_blank"><img src="https://images2.imgbox.com/0f/37/rC9Z7inP_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h3 id='eleventh-header'><b>Logout</b></h3>
          <br></br> 
            <ol align='left'>
              <li> In order to Logout, click on the Settings button on the top right corner and you will see a Logout button</li>
              <li> Click on the Logout button to log out of your account successfully</li>
              <li> Once you are done, you will see a message on the bottom right corner as “Logout Successful”.</li>
            </ol>  
              <div className='columnphoto'>
                <a href="https://imgbox.com/5V9M4zuZ" target="_blank"><img src="https://images2.imgbox.com/25/c1/5V9M4zuZ_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/kaB4zJ9w" target="_blank"><img src="https://images2.imgbox.com/f6/ef/kaB4zJ9w_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h2 id="twelth-header"><strong><em>Ratings and Reviews</em></strong></h2>
          <br></br>
          
        <h3 id='thirteenth-header'><b>Add a review/rating</b></h3>
          <br></br>
            <ul align='left'>
              Firstly, to add a review or rating for an amenity can be done when you Login/ Sign Up on the website. 
              Once you are logged in, you can review, rate, edit and delete as many spots of the amenities you want.
            </ul>
          <br></br> 
            <ol align='left'>Follow the below steps post Login:-
              <li> To add a review and rating for an amenity, browse the preferred amenity using the amenity buttons available on the website </li>
              <li> When you select an icon of the desired amenity the colour of the marker will change and the side drawer will 
                   open up where you see further options</li>
              <li> Select the “Add Review” button from the list and a small popup window will open up where you can enter rating(1-5) 
                   and the review of the selected amenity location</li>
              <li> Currently the Review length is limited to 250 characters and once you are entering the details click on the “Submit” 
                   button to post the review of the selected location</li>
              <li> Post submission you can view your posted review in the side drawer. Furthermore, you can view the details of the user 
                   posting the review along with the rating, review and number of likes/dislikes. </li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/w6THuyFA" target="_blank"><img src="https://images2.imgbox.com/f0/8b/w6THuyFA_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/ODg46Sdv" target="_blank"><img src="https://images2.imgbox.com/40/31/ODg46Sdv_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/7Q7KVe0C" target="_blank"><img src="https://images2.imgbox.com/d6/7f/7Q7KVe0C_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/mrHb8HNp" target="_blank"><img src="https://images2.imgbox.com/17/8b/mrHb8HNp_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/9gtXeMst" target="_blank"><img src="https://images2.imgbox.com/cb/c0/9gtXeMst_o.png" alt="imgbox"/></a>
              </div>
          <br></br> <br></br> 
        <h3 id='fourteenth-header'><b>Like/Dislike Review</b></h3>
          <br></br> 
            <ul align='left'>
              To like/dislike a review you can either login or proceed with below steps without login:-
            </ul>
            <ol align='left'>
              <li> If you would like to Like/Dislike a review open the desired amenity marker and select the review you would 
                   like to rate from the side drawer</li>
              <li> Click on Like to update the review in case you want to leave a positive feedback for a user review</li>
              <li> Click on Dislike to update the review in case you want to leave a negative feedback for a user review.</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/7lEzGFmg" target="_blank"><img src="https://images2.imgbox.com/c2/3a/7lEzGFmg_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/3G7G7DBz" target="_blank"><img src="https://images2.imgbox.com/2c/05/3G7G7DBz_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/aPwxd8yG" target="_blank"><img src="https://images2.imgbox.com/aa/e9/aPwxd8yG_o.png" alt="imgbox"/></a>
              </div>
            <br></br> <br></br> 
        <h3 id='fifteenth-header'><b>Edit/Delete Review</b></h3>
          <br></br> 
            <ul align='left'>
              In order to edit or delete a review you need to login into the website and proceed with the next steps mentioned below:
            </ul>
            <ol align='left'>
              <li> A popup window will open up and you can edit the rating and review of the selected amenity location</li>
              <li> Once you are done with editing the review, click on the submit button to save the changes to review</li>
              <li> If you would like to delete the review, click on the delete button on the selected review</li>
              <li> A pop up window will open up to confirm the deletion of the review. When you press “Yes” the page will 
                   be redirected and your review will be deleted.</li>
            </ol>
              <div className='columnphoto'>
                <a href="https://imgbox.com/LTzvwZDM" target="_blank"><img src="https://images2.imgbox.com/79/3f/LTzvwZDM_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/ACeuMBVo" target="_blank"><img src="https://images2.imgbox.com/89/28/ACeuMBVo_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/O1iY8GNR" target="_blank"><img src="https://images2.imgbox.com/e1/3b/O1iY8GNR_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/UMlcZDgM" target="_blank"><img src="https://images2.imgbox.com/ee/68/UMlcZDgM_o.png" alt="imgbox"/></a> 
                <a href="https://imgbox.com/pXMUw4ve" target="_blank"><img src="https://images2.imgbox.com/1e/8a/pXMUw4ve_o.png" alt="imgbox"/></a>
              </div>
            <br></br> <br></br> 
      </div>

        <nav className='content2'>
          <TableOfContent />
        </nav>
    </div>
  )
}

export default MainContent