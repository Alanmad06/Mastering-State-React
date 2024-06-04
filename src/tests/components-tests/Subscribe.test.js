import { render, screen } from '@testing-library/react';
import { Subscribe } from '../../components/Subscribe';

describe("<Subscribe/>",()=>{

    test("Renderizado componente Subscribe" ,()=>{
        render(<Subscribe/>)
        const titleElement = screen.getByText(/Join Our Program/i)
        expect(titleElement).toBeInTheDocument()
    })


})

