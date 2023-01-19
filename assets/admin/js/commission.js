var cat_html = "";
var count_view = 0;
$(document).on('click', '#seller_model', function (e) {
    e.preventDefault();
    cat_html = $('#cat_html').html();
    var cat_ids = $(this).data('cat_ids') + ',';
    var cat_array = cat_ids.split(",");
    cat_array = cat_array.filter(function (v) {
        return v !== ''
    });
    cat_array.sort(function (a, b) {
        return a - b;
    });
    var seller_id = $(this).data('seller_id');
    if (cat_ids != "" && cat_ids != "," && cat_ids != 'undefined' && seller_id != "" && seller_id != 'undefined' && count_view == 0) {
        $.ajax({
            type: 'POST',
            data: {
                'id': seller_id,
                [csrfName]: csrfHash
            },
            url: base_url + 'admin/sellers/get_seller_commission_data',
            dataType: 'json',
            success: function (result) {
                csrfName = result.csrfName;
                csrfHash = result.csrfHash;
                if (result.error == false) {
                    var option_html = $('#cat_html').html();
                    $.each(result.data, function (i, e) {
                        var is_selected = (e.category_id == cat_array[i] && e.seller_id == seller_id) ? "selected" : "";
                        if (is_selected === '') {
                            load_category_section(cat_html);
                        } else {
                            option_html += '<option value=' + e.category_id + ' ' + is_selected + '>' + e.name + '</option>';
                            load_category_section("", true, option_html, e.commission);
                        }
                    });
                } else {
                    iziToast.error({
                        message: '<span>' + result.message + '</span> ',
                    });
                }
            }
        });
        count_view = 1;
    } else {
        if (count_view == 0) {
            load_category_section(cat_html);
        }
        count_view = 1;

    }

});