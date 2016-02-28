var app = angular.module('hired', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/',
	{
		controller: homeController,
		templateUrl: 'templates/home.html'
	}).when('/jobs',
	{
		controller: jobsController,
		templateUrl: 'templates/jobs.html'
	}).otherwise({
		redirectTo: '/',
		controller: homeController
	});	
}]);


var homeController = function($scope){
	$scope.welcome = "Welcome to the home page!"
}

var jobsController = function($scope) {
	$scope.welcome = "Welcome to the jobs page!"
}

var canned_jobs_data = 
[
  {
    "Job Title": "Equipment Rebuilder",
    "Job Description": "PRINCIPAL FUNCTION: Repairs, cleans and updates dish washing machines and dispensing units.\n\nRESPONSIBILITIES AND DUTIES:\n\nCompletes a thorough tear-down and rebuild of each piece of equipment assigned. Completed rebuilds are clean, problem free and completely functioning when installed.\nAssists in areas of production, installation, service and sales support as deemed necessary by the Branch Manager.\nMaintains accurate records of machine serial numbers as machines are worked. Submit this information to the Branch Manager weekly.\nUse repair parts prudently, making distinctions between discard and reusable parts.\nUses all appropriate and required safety equipment and procedures.\nMaintains a clean, neat and safe work area.\nParticipates in \"on-call\" rotation providing quality service to Auto-Chlor customers.",
    "Location": "Oakland",
    "Pay": "$25",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Bicycle Repair",
    "Job Description": "Do you love bikes but lack experience? Do you have mechanical experience but no familiarity with bicycles? We'll train you! As a new technician, you will attend a 2-day intensive class to introduce you to the skills, techniques and knowledge that make our tech departments so successful. Taught by SBCU-certified ('SBCU' = Specialized Bicycle Components University) instructors in our brand new tech lab at HQ in Novato, this class will prepare you for a successful career in wrenching bikes. Bring your enthusiasm and willingness to learn, we will provide the rest. After the 2-day intensive class, you will receive ongoing training on more advanced repairs from your on-site manager. Work alongside the industry's best bike mechanics and learn the ins and outs of building and repairing quality bicycles. You'll work on brand new racing bikes and well-loved and used comfort bikes, as well as everything in between. If you are open to new ideas and excited about participating in an environment where delivering an outstanding customer experience is our guiding principle, check us out. And if you're passionate about bicycles, you'll fit right in!",
    "Location": "Berkeley",
    "Pay": "$17",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Hotel Room Cleaner",
    "Job Description": "Qualifications\n�Customer service experience is required, preferably in a hotel or related field\n�Must have ability to work weekends and holidays\n�Requires strong command of the English language to include speaking, reading and writing\n�Ability to learn quickly and work in fast paced position with guest interaction\n�Must be able to multi-task\n�Ability to lift, pull, and push moderate weight (minimum of 20 lbs)\n�Must be 18 years or older\n�A true desire to satisfy the needs of others in a fast paced environment",
    "Location": "Fremont",
    "Pay": "$13.50",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Lead Solar Installer",
    "Job Description": "The residential Lead Installer is responsible for working as a contributing member of the solar installation crew, working closely with the crew Foreman and leading the mechanical portions of the solar installation. \n\nThis position leads, organizes, and performs the safety equipment placement, array layout, racking installation, and module placement. The Lead Installer will work as team with the Foreman and the Installer to safely and successfully complete residential and small commercial solar installations.",
    "Location": "San Pablo",
    "Pay": "$25",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Assistant Irrigation Technician",
    "Job Description": "Franklin Canyon Golf Course\nAssistant Irrigation Technician\nMust be hardworking, team player and be on time\n$14 / hr\n40 hours week plus OT\nPlease have at least 1 year irrigation experience\n1/2 price lunch at golf course\nDiscounted merchandise\nFree golf\nLooking to fill position now",
    "Location": "Concord",
    "Pay": "$14",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Machinist Journeyman",
    "Job Description": "Custom Product Development Corp. is looking for a bright, energetic, experienced Journeyman Machinists Lathe and or Mill\n\nDay & Swing shift Available\n\n. Setup and run CNC lathe\n. Setup and run CNC mills HAAS control\n. Able to safely prove out new programs & give feedback to supervisor\n. Knowledge of tooling, materials, feed and speeds\n. Able to check own parts\n. Basic inspection tools required\n. Manual machining ability an advantage \n. Programming experience a plus\n. Looking for team players\n. When necessary overtime working required\n\nBenefits include health, dental, and 401K\nOffer competitive pay structure DOE",
    "Location": "Pleasanton",
    "Pay": "$24",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Warehouse Worker",
    "Job Description": "A food manufacturing company is looking for a positive attitude, team player, hard-working, and dependable individual to work in a fast paced warehouse. \n\nThe Warehouse Picker/Packer position involves pushing a cart through the warehouse quickly picking packaged and bulk cases from order sheets. Then pack packaged cases into corrugated shipping boxes.\n\nThis job is physically demanding, requires standing and walking long period of time, and lifting throughout the entire shift. \n\nJob Requirements:\n\n� 1-2 year experience working in warehouse (picking, packing, shipping, & receiving)\n� Able to work in a fast paced warehouse pick and pack orders accurately \n� Able to build LTL palletized cargo, shrink wrap, and pack outbound shipments\n� Able to lift 32 pounds bulk cases for extended periods of time as a normal daily activity \n� Able to lift up to 65 pounds shipping boxes\n� Walk and stand for long period of time or entire shift \n� Stand up forklift experience a plus \n� Load and unload trucks\n� Work safely and keep work area clean\n� Perform general warehouse duties as assigned by management \n� Must be able to follow written and verbal instructions\n� Ability to read and write\n� Excellent attendance record \n� Able to multitask\n� Bilingual Spanish a plus \n\nPlease make sure to include a cover letter and resume.",
    "Location": "Richmond",
    "Pay": "$15",
    "Employment Type": "Part Time"
  },
  {
    "Job Title": "Warehouse Manufacturing",
    "Job Description": "Do you have experience in Production and Warehouse? Randstad is partnered with growing manufacturing companies that are always hiring on a Temp-hire and Direct Hire basis \n\nA job fair will be held on Wednesday March 2nd 2016\n\nPositions that will be interviewing for:\nPackaging\nLoader/Unloader\nShipping and Receiving\nForklift Operators\nQuality Assurance Technicians\nAssemblers\nSecurity Guards\nProduction Managers\nProduction Supervisors\nMaintenance Mechanics\nShop Managers (SF area)",
    "Location": "Hayward",
    "Pay": "$18",
    "Employment Type": "Part Time"
  },
  {
    "Job Title": "Clean Room Tech",
    "Job Description": "Clean Room Assembly Technician\nWill perform the final assembly of both high purity regulators & valves. Will prepare sub assemblies and ensure quality of jobs as per BOM's. Will maintain inventory; inspect seats & regulator parts; communicate the priority of completed jobs to function testers.",
    "Location": "Fremont",
    "Pay": "$16",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Tech Support",
    "Job Description": "Technical Support \n\nResponsibilities:\n\n*Troubleshoots, analyses and recommends application solutions and advises customers on all product related issues over the phone or email to board level.\n*Provides pre-sales and post-sales technical support for all products and makes recommendations to customers regarding appropriate products to purchase for their system.\n*Recommends modification of computer systems, design and/or specifications to rectify customer problems.\n*Support OEMs, Distributors, Resellers, Retailers, Etailers & End Users. Recreate the problem with the information customers have given us and provide a solution.\n*Support & guide customers in downloading & installing of BIOS, drivers & manuals.\n*Performs various other tasks and special projects as directed by manager.\n*Develops training programs to provide training for sales representatives as needed.\n\nRequirements:\n\n*Minimum 1 years technical support experience on board level.\n*Highly skilled and proficient in IPC products, Embedded architecture, including single board computers, CPU, BIOS, LVDS interface and peripherals.\n*Experience in motherboard testing, system fan/blower selection and control, and barebones assembly.\n*Able to make progress in multiple tasks simultaneously and be flexible to changing requirements and priorities.\n*Expert knowledge of major OS environments including but not limited to Windows & Linux\n*Problem-solving skills & excellent communication and customer service skills is a must.",
    "Location": "Fremont",
    "Pay": "$21",
    "Employment Type": "Full Time"
  },
  {
    "Job Title": "Help Desk Engineer",
    "Job Description": "IT experience is a plus, but alignment with our Core Values is non-negotiable. \n\n� Bring your whole self; with positive energy and enthusiasm\n� Take pride in your work and take the long view\n� Create an exceptional customer experience at every opportunity \n� Have a sense of humor and take enjoyment from the day\n� Pursue growth and learning",
    "Location": "Berkeley",
    "Pay": "$14",
    "Employment Type": "Part Time"
  },
  {
    "Job Title": "Desktop Printer Tech",
    "Job Description": "The position is responsible for providing printer and desktop systems support to end users.\n\n-1-2 years experience providing end user system support through knowledge of Windows XP/ Windows Operating Systems and Microsoft applications (Access, Word, and Excel) as well as other common business applications. \n-Provide first-level on-site and/or remote technical support to end users for multiple enterprise applications to include e-mail, calendar, word processing, spreadsheets, presentations, and Internet browsers as well as department-specific specialized applications\n-Troubleshoot various Microsoft Windows and Microsoft Office issues. Windows based computers, devices and peripherals, networks and local printers, connectivity, and email issues (Microsoft Outlook)\n- Image and configure laptops and desktops using Ghost software\n- Must have experience with Active Directory and Group Policies\n- HP printer experience required\n- Open, close, and keep accurate records of all trouble ticket causes and resolution\n- Perform hardware/software tracking and asset management\n- Provide timely and responsive quality customer service and support at all times\n- Perform other duties and responsibilities as required\n- Perform Windows Updates \n- Documentation of Hardware and Software installation procedures\n- Excellent thinking, analysis, and decision making skills \n- Experienced with technical troubleshooting and problem solving \n- Must have working experience with computer and network hardware. \n- Good organizational and analytical skills are essential for success in this role \n- Able to work with minimal direction\n- Excellent interpersonal, business communication and writing skills \n- Ability to handle multiple tasks and solve problems",
    "Location": "Pleasanton",
    "Pay": "$23",
    "Employment Type": "Full Time"
  }

];

var canned_resources_data = [
	{

	}
]

var userProfileInformation = {
	name: 'Name of user'
}

var resourcesService = function() {
	return {
		getResources: function() {
			return canned_resources_data;
		}
	}
}

var userService = function() {
	return {
		getUser: function() {
			return userProfileInformation;
		},
		setUser: function(user) {
			userProfileInformation = user;
		}
	}
}

var jobsService = function() {
	return {
		getJobs: function() {
			return canned_jobs_data;
		}
	}
}