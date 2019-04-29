const name = $('#name');
const jobRoleField = $("#other-title");
const other = $('option:eq(5)');

name.focus();
jobRoleField.hide();

function showJobRoleField(){
    if ($("#title").val() === "other") {jobRoleField.show()}
    else jobRoleField.hide();
}

$("#title").on("change", showJobRoleField);
