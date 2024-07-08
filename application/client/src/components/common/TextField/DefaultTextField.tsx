import TextField from '@mui/material/TextField';

interface TextFieldProps {
    id :string;
    label :string;
    variant ?: 'filled' | 'outlined' | 'standard';
    type ?: "password"
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;


}

const DefaultTextField: React.FC<TextFieldProps> = ({ id, label, variant, onChange, type}) =>{
    return(
        <div>
            <TextField id = {id} label={label} variant={variant} onChange={onChange} type={type}/>
        </div>

    );
    
    
}

export default DefaultTextField;