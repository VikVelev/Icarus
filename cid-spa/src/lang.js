// lang dictionary specification:
// camelCase everything except the agenda
// agenda:
// n_ means Navbar
// e_ means Error
// p_ means Profile
// _p means Placeholder
// _t means Tab
// po_ means Post
// m_ means Model
// c_ means Commit
// b_ means Button Text
// s_ means Section


const lang = {
    // ============================================================================================================================
    // ========================================================== BULGARIAN =======================================================
    // ============================================================================================================================
    
    'bg' : {
        loading: "Loading",
        homePage: {
            nav: {
                Home: "Home",
                Demo: "Demo",
                b_LogIn: "Log in",
                b_SignUp: "Sign Up",
            },
            b_hero: "Get Started",
            s_keepTrack: {
                title: "Keep in track of your changes", 
                content: "Be able to keep track of every change made to every model with the provided version control system. One of the first dedicated specifically to the 3D industry."
            }, 
            s_accessible: {
                title: "Accessible and fast", 
                content: "Providing fast, reliable and responsive viewport for viewing your 3D models in the web, on the go from your phone or anywhere you want."
            },
            heroText: "Collaboration in 3D Design made easier.",
            s_objRating: {
                first: "\"MyProject000001a.obj\"",
                second: "We've experienced it too."
            },
            s_clientRating: {
                first: "\"This is what I needed.\"",
                second: "CGMEETUP"
            },
            demoText: "Test it yourself",
            footer: {
                sitemap: "Sitemap",
                about: "About",
                contact: "Contact Us",            
            },
        },
        loginPage: {
            title: "Log into your account",
            username_p: "Username",
            password_p: "Password",
            b_LogIn: "Log in",
            footer: "Don't have an account?",
            footerLink: "Sign up"
        },
        registerPage: {
            title: "Create a new account",
            username_p: "Username",
            email_p: "E-mail",            
            password_p: "Password",
            password2_p: "Password",
            b_SignUp: "Sign up",
            footer: "Already have an account?",
            footerLink: "Log in"
        },
        mainNavbar: {
            home: "Home",
            trending: "Trending",
            search_p: "Type to start searching...",
            user: {
                profile: "Profile",
                revisions: "Revisions",
                createPost: "Create Post",
                createModel: "Create Model",
                settings: "Settings",
                signOut: "Sign Out",                                
            }
        },
        model: {
            createdBy: "Created by",
            noCommitsInfo: "No commits available. You can add one by clicking the three dots on the right.",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                commits: "Commit chain",
                addCommit: "Add commit",
                downloadMesh: "Download mesh",
                downloadTex: "Download textures",
                addOwner: "Add owner"
            }
        },
        commit: {
            belongsTo: "Belongs to model",
            version: "Version",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                viewModel: "View Model"
            }
        },
        post: {
            postedBy: "Posted by",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                commits: "Commit chain",
                addCommit: "Add commit",
                addOwner: "Add owner"
            }
        },
        modelViewPage: {
            currentlyLooking: {
                title: "Currently looking at",
                details: "Details",
                committedBy: "Committed by",
                nothing: "Nothing.",
                version: "Version"

            },
            uploadedBy: "Uploaded by",
            views: "views",
            commits: "Commits",
            b_contribute: "Contribute",
            b_fork: {
                yours: "Your model",
                forked: "Already forked",
                fork: "Fork"                
            },
            mentions: "Mentions",
        },
        profilePage: {
            models_t: "3D Models",
            contrib_t: "Contributions",
            posts_t: "Posts",
            using: "Using",
            contrib: {
                activity: "Activity",
                commitsChart: "commits",
                nothing: "You haven't done anything. You can add a commit from the model menu (the three dots sitting next to each model in your 3D Models tab)."
            }
        },
        profileSettings: {
            title: "Settings",
            b_uploadPic: "Upload picture",
            firstName: "First name",
            firstName_p: "Enter first name",
            lastName: "Last name",        
            lastName_p: "Enter last name",        
            email: "E-mail",
            email_p: "Enter e-mail",            
            country: "Country",
            country_p: "Country",
            software: "Software",
            software_p: "Type in the software you are using",
            birthDate: "Birth date",
            description: "Description",
            description_p: "Write your description",
            b_saveChanges: "Save changes",
            saveChanges_success: "Your profile was updated successfully.",
            processing: "Processing..."
        },
        revisionItem: {
            postedBy: "Posted by",
            model: "Model",
            status: "Status",
        },
        revisions: {
            pending_t: "Pending",
            approved_t: "Approved",
            rejected_t: "Rejected",              
            proposedRev: {
                title: "Your propsed revisions",
                noRevs: "No revisions.",
            },
            reviewRev: {
                title: "Revisions to review",
                noRevs: "No revisions to review.",                
            }
        },
        addCommit: {
            header: "Add a commit",
            title: "Title",
            title_p: "Write a title",
            desc: "Description",
            desc_p: "Write a description",
            selectModel: "Select a new model",
            b_selectModel: "Choose a new model",
            selectTex: "Select new textures",
            b_selectTex: "Choose new textures",
            b_commit: "Commit",
            supportWarn: "Currently supporting only .obj models and .mtl textures.",
            processing: "Processing...",
            success: "A new commit has been added.",
            successRev: "A new revision has been sent for review."
        },
        createPost: {
            header: "Add post",
            title: "Title",
            title_p: "Write a title",            
            selectModel: "Select a 3D Model",
            selectModel_p: "Select from a list of all available models",
            selectImage: "Select a thumbnail",
            b_selectImage: "Upload picture",
            desc: "Description",
            desc_p: "Write a description",
            success: "Successfully added a new post.",
            processing: "Processing...",
            b_addPost: "Add post",
        },
        createModel: {
            header: "Create a project",
            createInfo: "You can create a project without uploading a model.",
            title: "Title",
            title_p: "Write a title",
            desc: "Description",
            desc_p: "Write a description",
            initCommitCheck: "Create an initial commit",
            initCommitInfo: "Initial commit is required if you want to upload a model.",
            initCommit: {
                header: "Initial commit",
                selectModel: "Select a model",
                b_selectModel: "Choose a model",
                selectTex: "Select textures",
                b_selectTex: "Choose textures",
                initCommitWarn: "Currently supporting only .obj models and .mtl textures."
            },
            b_create: "Create",
            success: "Model successfully created."
        }
    }
    // ============================================================================================================================
    // ========================================================== ENGLISH =========================================================
    // ============================================================================================================================
    
    'en' : {
        loading: "Loading",
        homePage: {
            nav: {
                Home: "Home",
                Demo: "Demo",
                b_LogIn: "Log in",
                b_SignUp: "Sign Up",
            },
            b_hero: "Get Started",
            s_keepTrack: {
                title: "Keep in track of your changes", 
                content: "Be able to keep track of every change made to every model with the provided version control system. One of the first dedicated specifically to the 3D industry."
            }, 
            s_accessible: {
                title: "Accessible and fast", 
                content: "Providing fast, reliable and responsive viewport for viewing your 3D models in the web, on the go from your phone or anywhere you want."
            },
            heroText: "Collaboration in 3D Design made easier.",
            s_objRating: {
                first: "\"MyProject000001a.obj\"",
                second: "We've experienced it too."
            },
            s_clientRating: {
                first: "\"This is what I needed.\"",
                second: "CGMEETUP"
            },
            demoText: "Test it yourself",
            footer: {
                sitemap: "Sitemap",
                about: "About",
                contact: "Contact Us",            
            },
        },
        loginPage: {
            title: "Log into your account",
            username_p: "Username",
            password_p: "Password",
            b_LogIn: "Log in",
            footer: "Don't have an account?",
            footerLink: "Sign up"
        },
        registerPage: {
            title: "Create a new account",
            username_p: "Username",
            email_p: "E-mail",            
            password_p: "Password",
            password2_p: "Password",
            b_SignUp: "Sign up",
            footer: "Already have an account?",
            footerLink: "Log in"
        },
        mainNavbar: {
            home: "Home",
            trending: "Trending",
            search_p: "Type to start searching...",
            user: {
                profile: "Profile",
                revisions: "Revisions",
                createPost: "Create Post",
                createModel: "Create Model",
                settings: "Settings",
                signOut: "Sign Out",                                
            }
        },
        model: {
            createdBy: "Created by",
            noCommitsInfo: "No commits available. You can add one by clicking the three dots on the right.",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                commits: "Commit chain",
                addCommit: "Add commit",
                downloadMesh: "Download mesh",
                downloadTex: "Download textures",
                addOwner: "Add owner"
            }
        },
        commit: {
            belongsTo: "Belongs to model",
            version: "Version",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                viewModel: "View Model"
            }
        },
        post: {
            postedBy: "Posted by",
            menu: {
                manage: "Manage",
                edit: "Edit",
                delete: "Delete",
                versionControl: "Version Control",
                commits: "Commit chain",
                addCommit: "Add commit",
                addOwner: "Add owner"
            }
        },
        modelViewPage: {
            currentlyLooking: {
                title: "Currently looking at",
                details: "Details",
                committedBy: "Committed by",
                nothing: "Nothing.",
                version: "Version"

            },
            uploadedBy: "Uploaded by",
            views: "views",
            commits: "Commits",
            b_contribute: "Contribute",
            b_fork: {
                yours: "Your model",
                forked: "Already forked",
                fork: "Fork"                
            },
            mentions: "Mentions",
        },
        profilePage: {
            models_t: "3D Models",
            contrib_t: "Contributions",
            posts_t: "Posts",
            using: "Using",
            contrib: {
                activity: "Activity",
                commitsChart: "commits",
                nothing: "You haven't done anything. You can add a commit from the model menu (the three dots sitting next to each model in your 3D Models tab)."
            }
        },
        profileSettings: {
            title: "Settings",
            b_uploadPic: "Upload picture",
            firstName: "First name",
            firstName_p: "Enter first name",
            lastName: "Last name",        
            lastName_p: "Enter last name",        
            email: "E-mail",
            email_p: "Enter e-mail",            
            country: "Country",
            country_p: "Country",
            software: "Software",
            software_p: "Type in the software you are using",
            birthDate: "Birth date",
            description: "Description",
            description_p: "Write your description",
            b_saveChanges: "Save changes",
            saveChanges_success: "Your profile was updated successfully.",
            processing: "Processing..."
        },
        revisionItem: {
            postedBy: "Posted by",
            model: "Model",
            status: "Status",
        },
        revisions: {
            pending_t: "Pending",
            approved_t: "Approved",
            rejected_t: "Rejected",              
            proposedRev: {
                title: "Your propsed revisions",
                noRevs: "No revisions.",
            },
            reviewRev: {
                title: "Revisions to review",
                noRevs: "No revisions to review.",                
            }
        },
        addCommit: {
            header: "Add a commit",
            title: "Title",
            title_p: "Write a title",
            desc: "Description",
            desc_p: "Write a description",
            selectModel: "Select a new model",
            b_selectModel: "Choose a new model",
            selectTex: "Select new textures",
            b_selectTex: "Choose new textures",
            b_commit: "Commit",
            supportWarn: "Currently supporting only .obj models and .mtl textures.",
            processing: "Processing...",
            success: "A new commit has been added.",
            successRev: "A new revision has been sent for review."
        },
        createPost: {
            header: "Add post",
            title: "Title",
            title_p: "Write a title",            
            selectModel: "Select a 3D Model",
            selectModel_p: "Select from a list of all available models",
            selectImage: "Select a thumbnail",
            b_selectImage: "Upload picture",
            desc: "Description",
            desc_p: "Write a description",
            success: "Successfully added a new post.",
            processing: "Processing...",
            b_addPost: "Add post",
        },
        createModel: {
            header: "Create a project",
            createInfo: "You can create a project without uploading a model.",
            title: "Title",
            title_p: "Write a title",
            desc: "Description",
            desc_p: "Write a description",
            initCommitCheck: "Create an initial commit",
            initCommitInfo: "Initial commit is required if you want to upload a model.",
            initCommit: {
                header: "Initial commit",
                selectModel: "Select a model",
                b_selectModel: "Choose a model",
                selectTex: "Select textures",
                b_selectTex: "Choose textures",
                initCommitWarn: "Currently supporting only .obj models and .mtl textures."
            },
            b_create: "Create",
            success: "Model successfully created."
        }
    }
}

export default lang