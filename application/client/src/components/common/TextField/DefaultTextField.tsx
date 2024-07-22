import TextField from '@mui/material/TextField';

interface TextFieldProps {
    id :string;
    label :string;
    variant ?: 'filled' | 'outlined' | 'standard';
    type ?: "password"
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | null;


}

const DefaultTextField: React.FC<TextFieldProps> = ({ id, label, variant, onChange, type ,value}) =>{
    return(
        <div>
            <TextField id = {id} label={label} variant={variant} onChange={onChange} type={type} value={value}/>
        </div>

    );
    
    
}

export default DefaultTextField;