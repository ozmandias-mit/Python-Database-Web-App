function generate_html(type, data = null) {
    let html_text = ``;
    if(type=="student") {
        if(data) {
            html_text = `
                <div class="card col-6 p-0">
                    <div id="student_container" class="scrollable_container h-100 p-2">
                        <h1 class="fw-bold">Edit student</h1>
                
                        <form id="student_form" class="row g-0">
                            <div id="profile_picture_container" class="mb-3">
                                <label for="student_profile_picture" class="form-label">Student Profile</label>
                                <div class="border rounded p-2">
                                    <img
                                        id="student_profile_img"
                                        src="${data.profile_picture ? data.profile_picture : '../static/profiles/blank_profile_picture.png'}"
                                        class="form-control p-1 mb-2"
                                        style="width: 80px; height: 80px; object-fit: contain;"
                                    >
                                    <input id="student_profile_picture" class="form-control" type="file" accept="image/*"
                                        oninput="convert_profile_picture(event)"
                                    >
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="student_name" class="form-label">Student Name</label>
                                <input id="student_name" class="form-control" value="${data.name}" placeholder="Eg: John Doe">
                            </div>

                            <div class="mb-3">
                                <label for="student_nrc" class="form-label">Student NRC</label>
                                <input id="student_nrc" class="form-control" value="${data.nrc}" placeholder="Eg: 12/XXX(N)000000">
                            </div>

                            <div class="mb-3">
                                <label for="student_dob" class="form-label">Student Date of Birth</label>
                                <input id="student_dob" class="form-control" value="${data.dob}" placeholder="mm/dd/yyyy" type="date">
                            </div>

                            <div class="mb-3">
                                <label for="student_phone_no" class="form-label">Student Phone Number</label>
                                <input id="student_phone_no" class="form-control" value="${data.phone_no}" placeholder="Eg: 95912345678">
                            </div>

                            <div class="mb-3">
                                <label for="student_address" class="form-label">Student Contact Details</label>
                                <input id="student_address" class="form-control" value="${data.permanent_address}" placeholder="Address">
                            </div>

                            <div class="mb-3" hidden>
                                <label for="student_email" class="form-label">Student Email</label>
                                <input id="student_email" class="form-control" value="${data.email}" placeholder="Email">
                            </div>

                            <div class="mb-3">
                                <label for="student_gender" class="form-label">Gender</label>
                                <select id="student_gender" class="form-select" aria-label="gender_select" value="${data.gender}">
                                    <option selected disabled>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="student_nationality" class="form-label">Nationality</label>
                                <select id="student_nationality" class="form-select" aria-label="nationality_select" value="${data.nationality}">
                                    <option selected disabled>Select nationality</option>
                                    <option value="local">Local</option>
                                    <option value="foreign">Foreign</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div class="d-flex justify-content-end col-12 p-2">
                        <button class="btn btn-success mx-1" style="width: 100px; max-height: 40px;" onclick="register()">
                            Update
                        </button>

                        <button class="btn btn-outline-secondary" style="width: 100px; max-height: 40px;"
                            onclick="go_to_page('view')"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            `;
        } else {
            html_text = `
                <div class="card col-6 p-0">
                    <div id="student_container" class="scrollable_container h-100 p-2">
                        <h1 class="fw-bold">Register a student</h1>
                
                        <form id="student_form" class="row g-0">
                            <div id="profile_picture_container" class="mb-3 border rounded p-2">
                                <label for="student_profile_picture" class="form-label">Student Profile</label>
                                <div class="border rounded p-2">
                                    <img
                                        id="student_profile_img"
                                        src="../static/profiles/blank_profile_picture.png"
                                        class="form-control p-1 mb-2"
                                        style="width: 80px; height: 80px; object-fit: contain;"
                                    >
                                    <input id="student_profile_picture" class="form-control" type="file" accept="image/*"
                                        oninput="convert_profile_picture(event)"
                                    >
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="student_name" class="form-label">Student Name</label>
                                <input id="student_name" class="form-control" placeholder="Eg: John Doe">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_nrc" class="form-label">Student NRC</label>
                                <input id="student_nrc" class="form-control" placeholder="Eg: 12/XXX(N)000000">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_dob" class="form-label">Student Date of Birth</label>
                                <input id="student_dob" class="form-control" placeholder="mm/dd/yyyy" type="date">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_phone_no" class="form-label">Student Phone Number</label>
                                <input id="student_phone_no" class="form-control" placeholder="Eg: 95912345678">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_address" class="form-label">Student Contact Details</label>
                                <input id="student_address" class="form-control" placeholder="Address">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_email" class="form-label">Student Email</label>
                                <input id="student_email" class="form-control" placeholder="Email">
                            </div>
        
                            <div class="mb-3">
                                <label for="student_gender" class="form-label">Gender</label>
                                <select id="student_gender" class="form-select" aria-label="gender_select">
                                    <option selected disabled>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
        
                            <div class="mb-3">
                                <label for="student_nationality" class="form-label">Nationality</label>
                                <select id="student_nationality" class="form-select" aria-label="nationality_select">
                                    <option selected disabled>Select nationality</option>
                                    <option value="local">Local</option>
                                    <option value="foreign">Foreign</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div class="d-flex justify-content-end col-12 p-2">
                        <button class="btn btn-success mx-1" style="width: 100px; max-height: 40px;" onclick="register()">
                            Register
                        </button>

                        <button class="btn btn-outline-secondary" style="width: 100px; max-height: 40px;"
                            onclick="go_to_page('list')"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            `;
        }
    } else if(type=="student_detail") {
        html_text = `
        <div class="card p-0">
            <div id="detail_container" class="scrollable_container h-100 col-6 p-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h1 class="fw-bold">Add student details</h1>

                    <button class="btn btn-dark" style="width: 100px; max-height: 40px;"
                        onclick="add_student_detail()"
                    >
                        Add Row
                    </button>
                </div>
        
                <form id="detail_form" class="row g-0">
                    <ul id="student_detail_list" class="list-group ">
                        <li class="list-group-item" style="background-color: rgb(240, 240, 240);">
                            <div class="row align-items-end">
                                <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                                    <label for="detail_academic_year" class="form-label">Academic Year</label>
                                    <input id="detail_academic_year" class="form-control">
                                </div>
        
                                <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                                    <label for="detail_mark_1" class="form-label">Mark 1</label>
                                    <input id="detail_mark_1" class="form-control">
                                </div>
                                    
                                <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                                    <label for="detail_mark_2" class="form-label">Mark 2</label>
                                    <input id="detail_mark_2" class="form-control">
                                </div>
        
                                <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                                    <label for="detail_mark_3" class="form-label">Mark 3</label>
                                    <input id="detail_mark_3" class="form-control">
                                </div>
        
                                <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                                    <label for="detail_remark" class="form-label">Remark</label>
                                    <input id="detail_remark" class="form-control">
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            
            <div class="d-flex justify-content-end col-12 p-2">
                <button
                    class="btn btn-dark" style="width: 100px; max-height: 40px;"
                    onclick="check_submit()"
                >
                    Submit
                </button>
            </div>
        </div>

            <div class="modal fade" id="remove_detail_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Remove Detail</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    Do you want to remove this detail?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="remove_student_detail()">Yes</button>
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
                </div>
            </div>
        `;
    } else if(type=="student_detail_data") {
        html_text = `
            <li id="detail_id_${data.detail_id}" class="list-group-item" style="background-color: rgb(240, 240, 240);">
                <div class="row align-items-end">
                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                        <label for="detail_academic_year" class="form-label">Academic Year</label>
                        <input id="detail_academic_year" class="form-control" value="${data.academic_year}">
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                        <label for="detail_mark_1" class="form-label">Mark 1</label>
                        <input id="detail_mark_1" class="form-control" value="${data.mark1}">
                    </div>
                
                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                        <label for="detail_mark_2" class="form-label">Mark 2</label>
                        <input id="detail_mark_2" class="form-control" value="${data.mark2}">
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                        <label for="detail_mark_3" class="form-label">Mark 3</label>
                        <input id="detail_mark_3" class="form-control" value="${data.mark3}">
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2 p-0">
                        <label for="detail_remark" class="form-label">Remark</label>
                        <input id="detail_remark" class="form-control" value="${data.remark}">
                    </div>

                    <div class="d-flex flex-column justify-content-center align-items-center col-md-2">
                        <span>"Click on this to remove"</span>
                        <button class="btn btn-danger" style="width: 100px; max-height: 40px;"
                            type="button"
                            data-bs-toggle="modal" data-bs-target="#remove_detail_modal"
                            onclick="set_remove_detail_id(${data.detail_id})"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </li>
        `;
    } else if(type=="student_table_data") {
        html_text = `
            <tr onclick="view_student(${data.id})" style="cursor: pointer;">
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.nrc}</td>
                <td>${data.dob}</td>
                <td>${data.phone_no}</td>
                <td>${data.email}</td>
                <td>${data.gender}</td>
                <td>${data.nationality}</td>
                <td>${data.permanent_address}</td>
            </tr>
        `;
    } else if(type=="details_table_data") {
        html_text = `
            <tr class="d-flex">
                <td class="d-flex align-items-top col-1">${data.id}</td>
                <td class="d-flex align-items-top col-2">${data.student_id}</td>
                <td class="d-flex align-items-top col-2">${data.academic_year}</td>
                <td class="d-flex align-items-top col-2">${data.mark1}</td>
                <td class="d-flex align-items-top col-2">${data.mark2}</td>
                <td class="d-flex align-items-top col-2">${data.mark3}</td>
                <td class="d-flex align-items-top col-2">${data.remark}</td>
            </tr>
        `;
    } else if(type=="student_view_data") {
        html_text = `
            <div class="position-relative d-flex align-items-end justify-content-end">
                <img
                    src="${data.profile_picture ? data.profile_picture : '../static/profiles/blank_profile_picture.png'}"
                    class="position-absolute form-control p-1"
                    style="width: 80px; height: 80px; object-fit: contain;"
                >
            </div>

            <div class="col-md-6">
                <label for="student_id" class="form-label">ID</label>
                <span type="text" class="form-control" id="student_id">${data.id}</span>
            </div>

            <div class="d-flex align-items-end justify-content-end col-md-6">
                <button type="button" class="btn btn-warning mx-1" style="width: 100px; max-height: 40px;" onclick="go_to_page('edit')">
                    Edit
                </button>
                <button type="button" class="btn btn-danger" style="width: 100px; max-height: 40px;"
                    data-bs-toggle="modal" data-bs-target="#remove_student_modal"
                >
                    Remove
                </button>
            </div>

            <div class="col-md-6">
                <label for="student_name" class="form-label">Name</label>
                <span type="text" class="form-control" id="student_name">${data.name}</span>
            </div>

            <div class="col-md-6">
                <label for="student_nrc" class="form-label">NRC</label>
                <span type="text" class="form-control" id="student_nrc">${data.nrc}</span>
            </div>

            <div class="col-md-6">
                <label for="student_email" class="form-label">Email</label>
                <span type="text" class="form-control" id="student_email">${data.email}</span>
            </div>

            <div class="col-md-6">
                <label for="student_phone_no" class="form-label">Phone Number</label>
                <span type="text" class="form-control" id="student_phone_no">${data.phone_no}</span>
            </div>

            <div class="col-md-6">
                <label for="student_address" class="form-label">Address</label>
                <span type="text" class="form-control" id="student_address">${data.permanent_address}</span>
            </div>

            <div class="col-md-6">
                <label for="student_dob" class="form-label">Date of Birth</label>
                <span type="text" class="form-control" id="student_dob">${data.dob}</span>
            </div>

            <div class="col-md-6">
                <label for="student_gender" class="form-label">Gender</label>
                <span type="text" class="form-control" id="student_gender">${data.gender}</span>
            </div>

            <div class="col-md-6">
                <label for="student_nationality" class="form-label">Nationality</label>
                <span type="text" class="form-control" id="student_nationality">${data.nationality}</span>
            </div>
        `;
    } else if(type=="details_view_data") {
        html_text = `
            <li class="list-group-item">
                <div class="row g-2">
                    <div class="col-md-3">
                        <label for="detail_academic_year" class="form-label">Academic Year</label>
                        <span type="text" id="detail_academic_year" class="form-control">${data.academic_year}</span>
                    </div>

                    <div class="col-md-2">
                        <label for="detail_mark_1" class="form-label">Mark 1</label>
                        <span type="text" id="detail_mark_1" class="form-control">${data.mark1}</span>
                    </div>
                        
                    <div class="col-md-2">
                        <label for="detail_mark_2" class="form-label">Mark 2</label>
                        <span type="text" id="detail_mark_2" class="form-control">${data.mark2}</span>
                    </div>

                    <div class="col-md-2">
                        <label for="detail_mark_3" class="form-label">Mark 3</label>
                        <span type="text" id="detail_mark_3" class="form-control">${data.mark3}</span>
                    </div>

                    <div class="col-md-3">
                        <label for="detail_remark" class="form-label">Remark</label>
                        <span type="text" id="detail_remark" class="form-control">${data.remark}</span>
                    </div>
                </div>
            </li>
        `
    } else if(type=="no_details_view_data") {
        html_text = `
            <li>
                <div class="d-flex justify-content-center col-12">
                    <p>Details not available!</p>
                </div>
            </li>
        `;
    } else if(type=="student_edit_data") {
        html_text = `
            <div class="mb-3" hidden>
                <label for="student_id" class="form-label">Student ID</label>
                <input id="student_id" class="form-control" placeholder="Email" value="${data.id}">
            </div>

            <div class="mb-3">
                <label for="student_name" class="form-label">Student Name</label>
                <input id="student_name" class="form-control" placeholder="Eg: John Doe" value="${data.name}">
            </div>

            <div class="mb-3">
                <label for="student_nrc" class="form-label">Student NRC</label>
                <input id="student_nrc" class="form-control" placeholder="Eg: 12/XXX(N)000000" value="${data.nrc}">
            </div>

            <div class="mb-3">
                <label for="student_dob" class="form-label">Student Date of Birth</label>
                <input id="student_dob" class="form-control" placeholder="mm/dd/yyyy" type="date" value="${data.dob}">
            </div>

            <div class="mb-3">
                <label for="student_phone_no" class="form-label">Student Phone Number</label>
                <input id="student_phone_no" class="form-control" placeholder="Eg: 95912345678" value="${data.phone_no}">
            </div>

            <div class="mb-3">
                <label for="student_address" class="form-label">Student Contact Details</label>
                <input id="student_address" class="form-control" placeholder="Address" value="${data.permanent_address}">
            </div>

            <div class="mb-3" hidden>
                <label for="student_email" class="form-label">Student Email</label>
                <input id="student_email" class="form-control" placeholder="Email" value="${data.email}">
            </div>

            <div class="mb-3">
                <label for="student_gender" class="form-label">Gender</label>
                <select id="student_gender" class="form-select" aria-label="gender_select" value="${data.gender}">
                    <option selected disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="student_nationality" class="form-label">Nationality</label>
                <select id="student_nationality" class="form-select" aria-label="nationality_select" value="${data.nationality}">
                    <option selected disabled>Select nationality</option>
                    <option value="local">Local</option>
                    <option value="foreign">Foreign</option>
                </select>
            </div>
        `;
    } else if(type=="register_success"){
        html_text = `
            <div id="successful_registration" class="d-flex justify-content-center col-12">
                <p class="text-white bg-success p-2">Successfully registered!</p>
            </div>
        `;
    } else if(type=="register_fail"){
        html_text = `
            <div id="fail_registration" class="d-flex justify-content-center col-12 mt-3">
                <p class="text-white bg-danger p-2">Registration Failed!</p>
            </div>
        `;
    } else if(type=="delete_success") {
        html_text = `
            <div id="successful_delete" class="d-flex justify-content-center col-12">
                <p class="text-white bg-success p-2">Successfully deleted!</p>
            </div>
        `;
    } else if(type=="pagination_back") {
        html_text = `
            <button class="btn btn-outline-dark rounded-end-2" onclick="paginate('back')">
                <i class="bi bi-arrow-left-short"></i>
            </button>
        `;
    } else if(type=="pagination_next") {
        html_text= `
            <button class="btn btn-dark rounded-start-2" onclick="paginate('next')">
                <i class="bi bi-arrow-right-short"></i>
            </button>
        `
    }
    return html_text;
}