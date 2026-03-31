document.addEventListener('DOMContentLoaded', () => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
        const order = JSON.parse(lastOrder);
        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = `
            <p><strong>Order ID:</strong> #${order.id}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
            <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
        `;
        localStorage.removeItem('lastOrder');
    }
});