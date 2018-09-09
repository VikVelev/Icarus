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
        loading: "Зареждане",
        homePage: {
            nav: {
                Home: "Начало",
                Demo: "Демо",
                b_LogIn: "Влизане",
                b_SignUp: "Регистрация",
            },
            b_hero: "Към платформата",
            s_keepTrack: {
                title: "Следете всяка промяна по проекта си", 
                content: "Възможност да следите и менажирате проектите си с имплементираната система за контрол на версиите. Една от първите направени специфично за индустрията."
            }, 
            s_accessible: {
                title: "Бързо и достъпно", 
                content: "Предоставя бърз и надежден вюпорт, за разглеждане на 3D моделите и разликите им в браузъра. През телефон, таблет или каквото и да е устройство."
            },
            heroText: "По-лесна и приятна колаборация в 3D дизайна",
            s_objRating: {
                first: "\"MyProject000001a.obj\"",
                second: "Ние сме минали през това също"
            },
            s_clientRating: {
                first: "\"Точно от това имах нужда\"",
                second: "CGMEETUP"
            },
            demoText: "Пробвайте го сами",
            footer: {
                sitemap: "Карта на сайта",
                about: "За нас",
                contact: "Контакти",            
            },
        },
        loginPage: {
            title: "Влезте в акаунта си",
            username_p: "Потребителско име",
            password_p: "Парола",
            b_LogIn: "Влизане",
            registerSuccess: "Успешна регистрация, можете да влезете в акаунта си.",
            footer: "Нямате акаунт?",
            footerLink: "Направете си"
        },
        registerPage: {
            title: "Създайте нов акаунт",
            username_p: "Потребителско име",
            email_p: "И-мейл",            
            password_p: "Парола",
            password2_p: "Повторете паролата",
            b_SignUp: "Регистрация",
            footer: "Вече имате акаунт?",
            footerLink: "Влезте"
        },
        mainNavbar: {
            home: "Начало",
            trending: "Популярно",
            search_p: "Започнете да пишете за да търсите...",
            user: {
                profile: "Профил",
                revisions: "Ревизии",
                createPost: "Създай пост",
                createModel: "Създай модел",
                settings: "Настройки",
                signOut: "Излизане",                                
            }
        },
        model: {
            createdBy: "Направен от",
            noCommitsInfo: "Няма добавен модел. Можете да добавите модел от трите точки вдясно",
            menu: {
                manage: "Менежиране",
                edit: "Редактиране",
                delete: "Изтриване",
                versionControl: "Контрол на версиите",
                commits: "Верига от промени",
                addCommit: "Добавете промяна",
                downloadMesh: "Изтегли меш",
                downloadTex: "Изтегли текстури",
                addOwner: "Добави собственик"
            }
        },
        commit: {
            belongsTo: "Принадлежи на модел",
            committedBy: "Променено от",
            version: "Версия",
            menu: {
                manage: "Менежиране",
                edit: "Редактиране",
                delete: "Изтриване",
                versionControl: "Контрол на версиите",
                viewModel: "Виж модел"
            }
        },
        post: {
            postedBy: "Написано от",
            menu: {
                manage: "Менежиране",
                edit: "Редактиране",
                delete: "Изтриване",
                versionControl: "Контрол на версиите",
                commits: "Верига от промени",
                addCommit: "Добавете промяна",
                addOwner: "Добавете собственик"
            }
        },
        modelViewPage: {
            currentlyLooking: {
                title: "В момента гледате",
                details: "Детайли",
                committedBy: "Променено от",
                nothing: "Нищо.",
                version: "Версия"
            },
            uploadedBy: "Качено от",
            views: "гледания",
            commits: "Промени",
            b_contribute: "Добави промяна",
            b_fork: {
                yours: "Твой модел",
                forked: "Разклонено",
                fork: "Разклони"                
            },
            mentions: "Споменавания",
        },
        profilePage: {
            models_t: "3D Модели",
            contrib_t: "Приноси",
            posts_t: "Постове",
            using: "Използва",
            contrib: {
                activity: "Дейност",
                commitsChart: "commits",
                nothing: "Не е направено нищо все още. Можете да добавите промяна към своя модел от трите точки отдясно, или на всеки друг модел през страницата му."
            }
        },
        profileSettings: {
            title: "Настройки",
            b_uploadPic: "Качете снимка",
            firstName: "Първо име",
            firstName_p: "Напишете първо име",
            lastName: "Последно име",       
            lastName_p: "Напишете последно име",        
            email: "E-mail",
            email_p: "Напишете e-mail",            
            country: "Държава",
            country_p: "Напишете държава",
            software: "Софтуер",
            software_p: "Напишете софтуера, който ползвате за обработка на 3D модели",
            birthDate: "Рожденна дата",
            description: "Описание",
            description_p: "Напишете няколко думи за себе си.",
            b_saveChanges: "Запазете",
            saveChanges_success: "Вашите промени бяха запазени успешно.",
            processing: "Зареждане..."
        },
        revisionItem: {
            postedBy: "Заявено от",
            model: "Модел",
            status: "Статус",
        },
        revisions: {
            pending_t: "В очакване",
            approved_t: "Одобрени",
            rejected_t: "Отказани",              
            proposedRev: {
                title: "Вашите изпратени ревизии",
                noRevs: "Няма ревизии.",
            },
            reviewRev: {
                title: "Ревизии за преглед",
                noRevs: "Няма ревизии",                
            }
        },
        addCommit: {
            header: "Добавете промяна",
            title: "Заглавие",
            title_p: "Напишете заглавие",
            desc: "Описание",
            desc_p: "Напишете описание",
            selectModel: "Изберете нов модел",
            b_selectModel: "Качване",
            selectTex: "Изберете нови текстури",
            b_selectTex: "Качване",
            b_commit: "Добавяне",
            supportWarn: "Към този момент се поддържат само файлове .obj и текстури .mtl.",
            processing: "Зареждане...",
            success: "Нова промяна бе добавена",
            successRev: "Нова ревизия бе изпратена за преглед от собственика."
        },
        createPost: {
            header: "Добавяне на пост",
            title: "Заглавие",
            title_p: "Напишете заглавие",            
            selectModel: "Изберете 3D модел",
            selectModel_p: "Изберете от списък с всички активни модели",
            selectImage: "Изберете снимка",
            b_selectImage: "Качване",
            desc: "Описание",
            desc_p: "Изразете мнението си",
            success: "Успешно добавен пост.",
            processing: "Зареждане...",
            b_addPost: "Добави пост",
        },
        createModel: {
            header: "Създаване на проект",
            createInfo: "Можете да направите проект без да се качва модел.",
            title: "Заглавие",
            title_p: "Напишете заглавие",
            desc: "Описание",
            desc_p: "Напишете описание",
            initCommitCheck: "Създайте начална точка",
            initCommitInfo: "Началната точка е задължителна ако искате да качите модел.",
            initCommit: {
                header: "Начална точка",
                selectModel: "Изберете модел",
                b_selectModel: "Качване",
                selectTex: "Изберете текстури",
                b_selectTex: "Качване",
                initCommitWarn: "Към този момент се поддържат само файлове .obj и текстури .mtl.",
            },
            b_create: "Създайте",
            success: "Успешно създаден модел."
        }
    },
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
            heroText: "3D workflows redefined.",
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
            registerSuccess: "Registration successful, you can log in now.",            
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
            committedBy: "Committed by",
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