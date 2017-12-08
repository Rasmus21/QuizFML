const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    Quiz: {

        create: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/quiz",
                data: data

            }, cb);
        },
    },

    Question: {

        create: (data, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: data

            }, cb);
        },

    },

    Course: {
        findAll: (cb) => {
            SDK.request({
                method: "GET",
                url: "/courses",
            }, cb);
        },

        findMine: (cb) => {
            SDK.request({
                method: "GET",
                url: "/orders/" + SDK.User.current().id + "/allorders",
                headers: {
                    authorization: SDK.Storage.load("tokenId")
                }
            }, cb);
        }
    },

    User: {
        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/user"
                },
                cb);
        },
        current: () => {
            return {
                userId: SDK.Storage.load("userId"),
                username: SDK.Storage.load("username"),
                firstName: SDK.Storage.load("firstName"),
                lastName: SDK.Storage.load("lastName"),
                type: SDK.Storage.load("type"),
        }
        },
        logOut: () => {
            SDK.Storage.remove("userId");
            SDK.Storage.remove("username");
            SDK.Storage.remove("firstName");
            SDK.Storage.remove("lastName");
            SDK.Storage.remove("type");

            window.location.href = "login.html";
        },
        login: (username, password, cb) => {
            SDK.request({
                data: {
                    password: password,
                    username: username

                },
                method: "POST",
                url: "/user/login"
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);

                data = JSON.parse(data);

                    SDK.Storage.persist("userId", data.userId);
                    SDK.Storage.persist("username", data.username);
                    SDK.Storage.persist("firstName", data.firstName);
                    SDK.Storage.persist("lastName", data.lastName);
                    SDK.Storage.persist("type", data.type);


                cb(null, data);

            });
        },
        create: (newUsername, newPassword, firstName, lastName, cb) => {
            SDK.request({
                url: "/user",
                method:"POST",
                data: {
                  username: newUsername,
                  password: newPassword,
                  firstName: firstName,
                  lastName: lastName,
                  type: 1
                },
            }, (err, data) => {
                //ved create user error
                if (err) return cb(err);

                data = JSON.parse(data);

                cb(null,data);
            });
        },

        createAdmin: (newUsername1, newPassword1, firstName1, lastName1, cb) => {
            SDK.request({
                url: "/user",
                method: "POST",
                data: {
                    username: newUsername1,
                    password: newPassword1,
                    firstName: firstName1,
                    lastName: lastName1,
                    type: 2
                },
            }, (err, data) => {
                //ved createAdmin error
                if (err) return cb(err);

                data = JSON.parse(data);

                cb(null, data);
            });
        },


        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();
                if (currentUser.userId !== null && currentUser.type == 2) {
                    // language=HTML
                    $(".navbar-right").html(`                        
                        <li><a href="courses.html">Courses</a></li>
                        <li><a href="userslist.html">Userslist</a></li>
                        <li><a href="login.html" id="logout-link">Log out</a></li>

                    `);
                }       else if (currentUser.userId !== null) {
                        // language=HTML
                        $(".navbar-right").html(`
                            <li><a href="courses.html">Courses</a></li>
                            <li><a href="login.html" id="logout-link">Log out</a></li>

                        `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Login<span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },


    Storage: {
        prefix: "QuizFMLSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
        }
    };
