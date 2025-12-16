import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251
        };

        loadCart = vi.fn();
        user = userEvent.setup();
    });

    it('displays correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </MemoryRouter>
        );

        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
            .getByText('$42.75')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-shipping-cost'))
            .getByText('$4.99')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total-before-tax'))
            .getByText('$47.74')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-tax'))
            .getByText('$4.77')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-total'))
            .getByText('$52.51')
        ).toBeInTheDocument();
    });

    it('places an order', async () => {
        function Location() {
            const location = useLocation();
            return (
                <div data-testid="url-path">{location.pathname}</div>
            );
        }

        render(
            <MemoryRouter>
                <Location />
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toBeCalledWith('/api/orders');
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    });
})