// Cart functionality
$(document).ready(function() {
    // Function to update product quantity
    function updateQuantity(productId, quantity) {
        $.ajax({
            url: '/updatecart',
            method: 'POST',
            data: {
                productId: productId,
                productQuantity: quantity
            },
            success: function(response) {
                if (response.success) {
                    window.location.reload();
                }
            },
            error: function(error) {
                console.error('Error updating quantity:', error);
            }
        });
    }

    // Function to remove product from cart
    window.removeFromCart = function(productId) {
        $.ajax({
            url: '/removecartproduct',
            method: 'POST',
            data: { productId: productId },
            success: function(response) {
                window.location.reload();
            },
            error: function(error) {
                console.error('Error removing product:', error);
            }
        });
    };

    // Event handlers for quantity buttons
    $('.btn-num-product-up').click(function() {
        const input = $(this).siblings('.num-product');
        const productId = $(this).siblings('input[name="productId"]').val();
        const newVal = parseInt(input.val()) + 1;
        input.val(newVal);
        updateQuantity(productId, newVal);
    });

    $('.btn-num-product-down').click(function() {
        const input = $(this).siblings('.num-product');
        const productId = $(this).siblings('input[name="productId"]').val();
        const newVal = Math.max(1, parseInt(input.val()) - 1);
        input.val(newVal);
        updateQuantity(productId, newVal);
    });

    // Handle direct input changes
    $('.num-product').change(function() {
        const val = Math.max(1, parseInt($(this).val()) || 1);
        $(this).val(val);
        const productId = $(this).siblings('input[name="productId"]').val();
        updateQuantity(productId, val);
    });

    // Update total price
    function updateTotalPrice() {
        let total = 0;
        $('.total-prod').each(function() {
            const price = parseFloat($(this).text().replace('$', '')) || 0;
            total += price;
        });
        $('#sumPrice').text(total.toFixed(2));
    }

    // Initial total price update
    updateTotalPrice();
});
