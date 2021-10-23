import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function FastSpecialAttacks(props) {
    const { attacks } = props;

    return attacks.map((attack) => 
    <table>
        <tr>
            <td>Name</td><td>{attack.name}</td>
        </tr>
        <tr>
            <td>Type</td><td>{attack.type}</td>
        </tr>
        <tr>
            <td>Damage</td><td>{attack.damage}</td>
        </tr>
    </table>);
}

function Characteristics(props) {
  const data = props.data;
  const listItems = data.map((item) => <li>{item}</li>);

  return <ul>{listItems}</ul>;
}

export default function Pokemon(props) {
  const { pokemon } = props;

  return (
    <Card sx={{ maxWidth: 375 }}>
      <CardHeader title={pokemon.name} subheader={"No. " + pokemon.number} />
      <CardMedia
        component="img"
        height="350"
        image={pokemon.image}
        alt={pokemon.classification}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Resistant : <Characteristics data={pokemon.resistant} />
          Weakness : <Characteristics data={pokemon.weaknesses} />
          Fast Attack : <FastSpecialAttacks attacks={pokemon.attacks.fast} /> <br />
          Special Attack : <FastSpecialAttacks attacks={pokemon.attacks.special} />
        </Typography>
      </CardContent>
    </Card>
  );
}
