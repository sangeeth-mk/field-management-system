import { Typography ,Button,TextField} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const Activitymanagement=()=>(
    <MainCard title="Activity Management">
        <Typography variant="body-2">
        <form>
        <TextField
          id="activity-name"
          label="Activity Name"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& input:focus + fieldset': {
                borderColor: 'red !important',
            },
        }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>

        </Typography>
    </MainCard>
)

export default Activitymanagement