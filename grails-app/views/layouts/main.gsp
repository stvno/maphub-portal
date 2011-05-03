<!DOCTYPE html>
<html>
    <head>
        <title><g:layoutTitle default="MapHub" /></title>
        <link rel="stylesheet" href="${resource(dir:'css',file:'main.css')}" />
        <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
        <g:javascript library="application" />
        <g:javascript library="swfobject" />
        <g:javascript library="jquery" />
        <g:layoutHead />
    </head>
    <body>
        <div id="spinner" class="spinner" style="display:none;">
            <img src="${resource(dir:'images',file:'spinner.gif')}" alt="${message(code:'spinner.alt',default:'Loading...')}" />
        </div>

				<!-- replace with maphub logo 
        <div id="grailsLogo"><a href="http://grails.org"><img src="${resource(dir:'images',file:'grails_logo.png')}" alt="Grails" border="0" /></a></div> -->
				
      <!-- User Action bar -->
      <div id="usertools">
        <sec:ifNotLoggedIn>
          <g:link controller='login' action='auth'>Login</g:link>
        </sec:ifNotLoggedIn>
        <sec:ifLoggedIn>
          Welcome, 
          <g:link controller="profile"><sec:loggedInUserInfo field="username"/></g:link>
          | <g:link controller='logout'>Logout</g:link>
        </sec:ifLoggedIn>
        <sec:ifAnyGranted roles="ROLE_ADMIN">
            | <g:link controller='admin'>Admin Area</g:link>
        </sec:ifAnyGranted>
      </div>

        <!-- Header text/logo -->
        <div id="header">
          <a href="/maphub-portal">MapHub</a>
        </div>
        
        <sec:ifLoggedIn>
        <!-- Navigation -->
        <div id="navigation">
          <ul>
            <li><a href="/maphub-portal">Home</a></li>
            <li><g:link action="browse" controller="map">Maps</g:link></li>
            <li><g:link action="browse" controller="user">Users</g:link></li>
						<sec:ifAnyGranted roles="ROLE_ADMIN, ROLE_USER_RW">
            	<li id="upload"><g:link action="index" controller="mapUpload">Upload Map</g:link></li>
						</sec:ifAnyGranted>
          </ul>
        </div>
        </sec:ifLoggedIn>
        
        <!-- Main contents -->
        <div id="main">
          <g:layoutBody />
        </div>
        
        <!-- Footer -->
        <div id="footer">
          <div>
            <div id="about">
            <h3>About MapHub</h3>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          
          <div id="links">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Terms of Service</a></li> 
            </ul>
          </div> <!-- end links -->
        </div> <!-- end footer div -->
        </div> <!-- end footer -->
    </body>
</html>
