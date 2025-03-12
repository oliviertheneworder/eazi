// Populate Training Courses
$('.jsontraining').each(function () {
    const jsonData = JSON.parse($(this).text().trim());
    if (jsonData && jsonData.course) {
        $('#trainingCourses').append(
            `<option value="${jsonData.course}">${jsonData.course}</option>`
        );
    }
});

// Populate Branches
$('.jsonbranch').each(function (index) {
    const rawText = $(this).text().trim(); // Trim whitespace
    try {
        const jsonData = JSON.parse(rawText);
        if (jsonData && jsonData.branch && jsonData.name) {
            $('#chooseBranch, #careerBranch').append( // For Quote Form and Career Form
                `<option value="${jsonData.branch}">${jsonData.name}</option>`
            );
        } else {
            console.warn(`Missing "branch" property (index ${index}):`, jsonData);
        }
    } catch (error) {
        console.error(`Error parsing JSON (index ${index}):`, rawText, error);
    }
});